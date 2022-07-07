import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  mergeMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Music } from '../../services/music-api.interface';
import { MusicApiService } from '../../services/music-api.service';
import { QueueService } from '../../services/queue.service';
import { UserService } from '../../services/user.service';
import { UnsubscribableComponent } from '../../utils/unsubscribable-component';
import { MusicComponentConfiguration } from '../music/music.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends UnsubscribableComponent implements OnInit {
  search = new FormControl<string>('');
  results: Music[] | null = null;
  loading = false;
  error = '';
  musicConfig: MusicComponentConfiguration = {
    votable: false,
    deletable: false,
    queueable: true,
    backlog: this.user.isAdmin(),
  };
  static readonly ERROR_MESSAGE = "Une erreur s'est produite, désolé 😫";
  static readonly ALREADY_IN_QUEUE =
    "Cette musique est déjà dans la file d'attente";

  constructor(
    private readonly music: MusicApiService,
    private readonly queue: QueueService,
    private readonly user: UserService
  ) {
    super();
  }

  // TODO implement music backlog
  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        takeUntil(this.$destroy),
        filter<string | null, string>(
          (query): query is string => typeof query === 'string'
        ),
        distinctUntilChanged(),
        debounceTime(500),
        tap(() => (this.loading = true)),
        mergeMap((query) => {
          if (query === '') {
            return of(null);
          }
          return this.music.search(query).pipe(
            tap(() => (this.error = '')),
            catchError(() => {
              this.error = SearchComponent.ERROR_MESSAGE;
              this.loading = false;
              return of(null);
            })
          );
        })
      )
      .subscribe({
        next: (results) => {
          this.results = results;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.results = null;
          this.error = SearchComponent.ERROR_MESSAGE;
        },
      });
  }

  addToQueue(music: Music) {
    this.queue.push(music).subscribe({
      next: () => {
        // TODO change icon to checkmark
      },
      error: (error) => {
        if (error?.error?.cause === 'queue') {
          this.error = SearchComponent.ALREADY_IN_QUEUE;
        } else {
          this.error = SearchComponent.ERROR_MESSAGE;
        }
        if (error?.error?.cause === 'queue-limit') {
          const queueLimit = error?.error?.limit;
          this.error = `Vous avez déjà ${
            queueLimit || 'plusieurs'
          } musiques dans la file d'attente. Veuillez attendre qu'elle soient terminées ou les supprimer pour en ajouter d'autres.`;
        }
        setTimeout(() => (this.error = ''), 5000);
      },
    });
  }

  addToBacklog(music: Music) {
    this.queue.pushBacklog(music).subscribe();
  }
}

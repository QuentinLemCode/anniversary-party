import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  mergeMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Music } from '../services/music-api.interface';
import { MusicApiService } from '../services/music-api.service';
import { QueueService } from '../services/queue.service';
import { UnsubscribableComponent } from '../utils/unsubscribable-component';

@Component({
  selector: 'app-music-manager',
  templateUrl: './music-manager.component.html',
  styleUrls: ['./music-manager.component.scss'],
})
export class MusicManagerComponent
  extends UnsubscribableComponent
  implements OnInit
{
  search = new FormControl<string>('');
  results: Music[] | null = null;
  loading = false;
  error = false;

  constructor(
    private readonly music: MusicApiService,
    private readonly queue: QueueService
  ) {
    super();
  }

  // TODO limit to 5 (or variable) music per user
  // TODO implement music backlog

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        takeUntil(this.$destroy),
        filter<string | null, string>(
          (query): query is string => typeof query === 'string'
        ),
        distinctUntilChanged(),
        debounceTime(300),
        tap(() => (this.loading = true)),
        finalize(() => (this.loading = false)),
        mergeMap((query) =>
          this.music.search(query).pipe(
            tap(() => (this.error = false)),
            catchError(() => {
              this.error = true;
              this.loading = false;
              return of([]);
            })
          )
        )
      )
      .subscribe({
        next: (results) => (this.results = results),
      });
  }

  addToQueue(music: Music) {
    this.queue.push(music).subscribe();
  }
}

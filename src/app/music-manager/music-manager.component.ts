import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MusicApiService } from '../services/music-api.service';
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
import { UnsubscribableComponent } from '../utils/unsubscribable-component';
import { of } from 'rxjs';
import {
  Music,
  SpotifyTrackCategory,
  SpotifyURI,
} from '../services/music-api.interface';

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

  constructor(private music: MusicApiService) {
    super();
  }

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

  addToQueue(uri: SpotifyURI<SpotifyTrackCategory>) {
    this.music.addToQueue(uri).subscribe({
      next: () => console.log('ok'),
    });
  }
}

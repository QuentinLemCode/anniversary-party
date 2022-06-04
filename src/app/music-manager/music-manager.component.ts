import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MusicApiService } from '../services/music-api.service';
import { debounceTime, distinctUntilChanged, filter, finalize, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { Unsubscribable } from '../utils/unsubscribable-component';
import { Music } from '../interfaces/music';

@Component({
  selector: 'app-music-manager',
  templateUrl: './music-manager.component.html',
  styleUrls: ['./music-manager.component.scss']
})
export class MusicManagerComponent extends Unsubscribable implements OnInit {

  search = new FormControl<string>('')
  results: Music[] | null = null
  loading = false

  constructor(private music: MusicApiService) {
    super();
  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      takeUntil(this.$destroy),
      filter<string | null, string>((query): query is string => typeof query === 'string'),
      distinctUntilChanged(),
      debounceTime(300),
      tap(() => this.loading = true),
      finalize(() => this.loading = false),
      mergeMap(query => this.music.search(query))
    ).subscribe({
      next: results => this.results = results
    })
  }

}

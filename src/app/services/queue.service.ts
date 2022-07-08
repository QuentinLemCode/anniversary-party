import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subscription, timer } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Backlog, Music, Queue } from './music-api.interface';
import { VisibilityService } from './visibility.service';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  private readonly endpoint = environment.serverUrl + 'queue';

  private readonly $queue = new ReplaySubject<Queue[]>(1);

  private $polling?: Subscription;

  constructor(
    private readonly http: HttpClient,
    readonly visibility: VisibilityService
  ) {
    this.visibility.change.subscribe({
      next: (status) => {
        if (status.visible) {
          this.launchPolling();
        } else {
          this.stopPolling();
        }
      },
    });
  }

  push(music: Music) {
    return this.http.post(this.endpoint, music).pipe(
      tap(() => {
        this.loadQueue();
      })
    );
  }

  get() {
    return this.$queue.asObservable();
  }

  getBacklog() {
    return this.http.get<Backlog[]>(this.endpoint + '/backlog');
  }

  pushBacklog(music: Music) {
    return this.http.post(this.endpoint + '/backlog', music);
  }

  forward(id: string | number) {
    return this.http.post(this.endpoint + '/' + id + '/forward', {}).pipe(
      tap(() => {
        this.loadQueue();
      })
    );
  }

  delete(id: string | number) {
    return this.http.delete(this.endpoint + '/' + id).pipe(
      tap(() => {
        this.$queue.pipe(first()).subscribe({
          next: (queue) => {
            const index = queue.findIndex((q) => q.id === id);
            if (index !== -1) {
              queue.splice(index, 1);
            }
          },
        });
      })
    );
  }

  deleteBacklog(id: string | number) {
    return this.http.delete(this.endpoint + '/backlog/' + id);
  }

  private launchPolling() {
    if (this.$polling && !this.$polling.closed) return;
    this.$polling = timer(0, 10000).subscribe(() => {
      this.loadQueue();
    });
  }

  private stopPolling() {
    this.$polling?.unsubscribe();
  }

  private loadQueue() {
    this.http.get<Queue[]>(this.endpoint).subscribe({
      next: (queues) => {
        this.$queue.next(queues);
      },
      error: (err) => {
        this.$queue.error(err);
      },
    });
  }
}

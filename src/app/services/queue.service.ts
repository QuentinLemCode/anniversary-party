import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Music, Queue } from './music-api.interface';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  private readonly endpoint = environment.serverUrl + 'queue';

  private $queue = new ReplaySubject<Queue[]>(1);

  constructor(private http: HttpClient) {
    this.loadQueue();
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

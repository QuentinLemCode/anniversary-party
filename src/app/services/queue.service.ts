import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Music, Queue } from './music-api.interface';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  private readonly endpoint = environment.serverUrl + 'queue';

  constructor(private http: HttpClient) {}

  push(music: Music) {
    return this.http.post(this.endpoint, music);
  }

  get() {
    return this.http.get<Queue[]>(this.endpoint);
  }
}

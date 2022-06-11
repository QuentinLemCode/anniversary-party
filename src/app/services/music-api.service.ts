import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Music } from '../interfaces/music';

@Injectable({
  providedIn: 'root'
})
export class MusicApiService {
  private readonly endpoint = environment.serverUrl + 'music'

  constructor(private http: HttpClient) { }

  search(query: string): Observable<Music[]> {
    return this.http.get<Music[]>(this.endpoint + '/search', {params: {query}})
  }

  getUrlLogin(): Observable<string> {
    return this.http.get(this.endpoint + '/spotify-login', {
      responseType: 'text'
    }).pipe(shareReplay(1));
  }

  authenticatePlayer(code: string) {
    return this.http.post(this.endpoint + '/register-player', {
      code
    });
  }

  getPlaybackStatus() {

  }
}

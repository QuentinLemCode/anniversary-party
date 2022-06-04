import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}

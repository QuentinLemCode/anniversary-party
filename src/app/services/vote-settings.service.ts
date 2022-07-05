import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface VoteSettingsQuery {
  maxVotes: number;
}

@Injectable({
  providedIn: 'root',
})
export class VoteSettingsService {
  private endpoint = environment.serverUrl + 'vote-settings';

  constructor(private readonly http: HttpClient) {}

  getMaxVotes() {
    return this.http.get<VoteSettingsQuery>(this.endpoint);
  }

  setMaxVotes(value: number) {
    const body: VoteSettingsQuery = {
      maxVotes: value,
    };
    return this.http.put<VoteSettingsQuery>(this.endpoint, body);
  }
}

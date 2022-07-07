import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface SettingsQuery {
  maxVotes: number;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private endpoint = environment.serverUrl + 'settings';

  constructor(private readonly http: HttpClient) {}

  getMaxVotes() {
    return this.http.get<SettingsQuery>(this.endpoint);
  }

  setMaxVotes(value: number) {
    const body: SettingsQuery = {
      maxVotes: value,
    };
    return this.http.put<SettingsQuery>(this.endpoint, body);
  }
}

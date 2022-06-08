import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint = environment.serverUrl + 'users';

  constructor(private http: HttpClient) {}

  register(name: string) {
    return this.http.post(this.endpoint + '/register', {
      name,
    });
  }

  login(name: string) {
    return this.http.post(this.endpoint + '/login', {
      name,
    });
  }
}

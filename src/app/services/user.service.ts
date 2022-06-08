import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtToken } from '../interfaces/token';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint = environment.serverUrl + 'users';
  private readonly KEY_TOKEN = 'token';
  private currentUser: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  register(name: string) {
    return this.http.post(this.endpoint + '/register', {
      name,
    }).pipe(shareReplay(1));
  }

  login(name: string) {
    return this.http.post<JwtToken>(this.endpoint + '/login', {
      name,
    }).pipe(
      shareReplay(1),
      tap((token) => this.saveToken(token.access_token))
      );
  }

  private saveToken(token: string) {
    localStorage.setItem(this.KEY_TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(this.KEY_TOKEN);
  }
  get isLoggedIn(): boolean {
    let authToken = this.getToken();
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem(this.KEY_TOKEN);
    if (removeToken === null) {
      this.router.navigate(['/']);
    }
  }
}

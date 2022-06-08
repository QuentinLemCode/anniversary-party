import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../interfaces/user-login';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userEndpoint = environment.serverUrl + 'users';
  private authEndpoint = environment.serverUrl + 'auth';
  private readonly KEY_TOKEN = 'token';
  private readonly KEY_USER = 'username';
  private readonly KEY_EXPIRES_AT = 'expires_at';

  constructor(private http: HttpClient, private router: Router) {}

  register(name: string) {
    return this.http
      .post(this.userEndpoint + '/register', {
        name,
      })
      .pipe(shareReplay(1));
  }

  login(name: string) {
    return this.http
      .post<UserLogin>(this.authEndpoint + '/login', {
        name,
      })
      .pipe(
        shareReplay(1),
        tap((token) => {
          this.saveLogin(token);
        })
      );
  }

  getToken() {
    return localStorage.getItem(this.KEY_TOKEN);
  }
  logout() {
    let removeToken = localStorage.removeItem(this.KEY_TOKEN);
    localStorage.removeItem(this.KEY_USER);
    localStorage.removeItem(this.KEY_EXPIRES_AT);
    if (removeToken === null) {
      this.router.navigate(['/']);
    }
  }
  get username(): string | null {
    // TODO ask the API if username doesn't exist
    if(this.isLoggedIn) {
      return localStorage.getItem(this.KEY_USER);
    }
    return null;
  }

  get isLoggedIn(): boolean {
    let authToken = this.getToken();
    return authToken !== null ? true : false;
  }

  private saveLogin(login: UserLogin) {
    localStorage.setItem(this.KEY_USER, login.username);
    localStorage.setItem(this.KEY_EXPIRES_AT, '' + login.expires_at);
    localStorage.setItem(this.KEY_TOKEN, login.access_token);
  }


}

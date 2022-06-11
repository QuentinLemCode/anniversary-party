import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../interfaces/user-login';

enum LocalStorageKeys {
  TOKEN = 'token',
  USER = 'user',
  EXPIRES_AT = 'expires_at',
  ROLE = 'role'
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userEndpoint = environment.serverUrl + 'users';
  private authEndpoint = environment.serverUrl + 'auth';

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
    return localStorage.getItem(LocalStorageKeys.TOKEN);
  }

  isTokenExpired() {
    return !this.expires_at || this.expires_at >= Date.now();
  }

  isAdmin() {
    return localStorage.getItem(LocalStorageKeys.ROLE) === 'admin';
  }

  logout() {
    this.clearLocalStorage();
    this.router.navigate(['/']);
  }
  get username(): string | null {
    // TODO ask the API if username doesn't exist
    if(this.isLoggedIn) {
      return localStorage.getItem(LocalStorageKeys.USER);
    }
    return null;
  }

  get isLoggedIn(): boolean {
    let authToken = this.getToken();
    return authToken !== null ? true : false;
  }

  get expires_at(): number | null {
    const lsItem = localStorage.getItem(LocalStorageKeys.EXPIRES_AT);
    if (lsItem === null) {
      return null;
    }
    return +lsItem;
  }

  private saveLogin(login: UserLogin) {
    localStorage.setItem(LocalStorageKeys.USER, login.username);
    localStorage.setItem(LocalStorageKeys.EXPIRES_AT, '' + login.expires_at);
    localStorage.setItem(LocalStorageKeys.TOKEN, login.access_token);
  }

  private clearLocalStorage() {
    Object.values(LocalStorageKeys).forEach(val => {
      localStorage.removeItem(val);
    });
  }

}

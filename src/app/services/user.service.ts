import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../interfaces/user-login';

enum LocalStorageKeys {
  TOKEN = 'token',
  USER = 'user',
  EXPIRES_AT = 'expires_at',
  ROLE = 'role',
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userEndpoint = environment.serverUrl + 'users';
  private authEndpoint = environment.serverUrl + 'auth';

  constructor(private http: HttpClient) {}

  register(name: string, challenge: string) {
    return this.http
      .post<UserLogin>(this.userEndpoint + '/register', {
        name,
        challenge,
      })
      .pipe(
        tap((token) => {
          this.saveLogin(token);
        })
      );
  }

  login(name: string) {
    return this.callLogin(name);
  }

  loginWithPassword(name: string, password: string) {
    return this.callLogin(name, password);
  }

  loginWithChallenge(name: string, challenge: string) {
    return this.callLogin(name, undefined, challenge);
  }

  getToken() {
    return localStorage.getItem(LocalStorageKeys.TOKEN);
  }

  isTokenExpired() {
    return !this.expires_at || this.expires_at <= this.now();
  }

  isAdmin() {
    if (!this.isLoggedIn) {
      return false;
    }
    return localStorage.getItem(LocalStorageKeys.ROLE) === 'admin';
  }

  logout() {
    this.clearLocalStorage();
  }
  get username(): string | null {
    if (this.isLoggedIn) {
      return localStorage.getItem(LocalStorageKeys.USER);
    }
    return null;
  }

  get isLoggedIn(): boolean {
    if (this.isTokenExpired()) {
      return false;
    }
    const authToken = this.getToken();
    return authToken !== null ? true : false;
  }

  get expires_at(): number | null {
    const lsItem = localStorage.getItem(LocalStorageKeys.EXPIRES_AT);
    if (lsItem === null) {
      return null;
    }
    return +lsItem;
  }

  private now() {
    return Math.floor(Date.now() / 1000);
  }

  private saveLogin(login: UserLogin) {
    localStorage.setItem(LocalStorageKeys.USER, login.username);
    localStorage.setItem(LocalStorageKeys.EXPIRES_AT, '' + login.expires_at);
    localStorage.setItem(LocalStorageKeys.TOKEN, login.access_token);
    localStorage.setItem(LocalStorageKeys.ROLE, login.role);
  }

  private clearLocalStorage() {
    Object.values(LocalStorageKeys).forEach((val) => {
      localStorage.removeItem(val);
    });
  }

  private callLogin(name: string, password?: string, challenge?: string) {
    return this.http
      .post<UserLogin>(this.authEndpoint + '/login', {
        name,
        password,
        challenge,
      })
      .pipe(
        shareReplay(1),
        tap((token) => {
          this.saveLogin(token);
        })
      );
  }
}

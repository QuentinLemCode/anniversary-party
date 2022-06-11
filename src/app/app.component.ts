import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private user: UserService, private router: Router) {
    if (this.user.isLoggedIn === false) {
      this.router.navigate(['login']);
    }
  }

  get isLoggedIn() {
    return this.user.isLoggedIn;
  }

  get username() {
    return this.user.username;
  }

  get isAdmin() {
    return this.user.isAdmin();
  }

  logout() {
    this.user.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}

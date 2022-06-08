import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private user: UserService, router: Router) {
    if(this.user.isLoggedIn === false) {
      router.navigate(['login']);
    }
  }

  get
  isLoggedIn() {
    return this.user.isLoggedIn;
  }
}

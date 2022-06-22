import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = new FormGroup({
    name: new FormControl(''),
  });

  get name() {
    return this.form.value.name;
  }

  constructor(private user: UserService, private router: Router) {}

  login() {
    if (!this.name) return;
    this.user.login(this.name).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          return this.navigateTo('register');
        }
        if (error.status === 403) {
          if (error.error.cause === 'password') {
            return this.navigateTo('password');
          } else if (error.error.cause === 'challenge') {
            return this.navigateTo('challenge');
          }
        }
        return;
      },
    });
  }

  private navigateTo(destination: 'register' | 'password' | 'challenge') {
    return this.router.navigate(['login', destination], {
      queryParams: { name: this.name },
    });
  }
}

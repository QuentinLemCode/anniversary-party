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
    nameControl: new FormControl<string>(''),
  });

  get nameControl() {
    return this.form.get('nameControl')!;
  }

  constructor(private user: UserService, private router: Router) {}

  login() {
    if (!this.nameControl.value) return;
    this.user.register(this.nameControl.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }
}

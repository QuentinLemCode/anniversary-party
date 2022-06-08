import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  nameControl = new FormControl<string>('');

  constructor(private user: UserService) { }

  submit() {
    if (!this.nameControl.value) return;
    this.user.register(this.nameControl.value).subscribe({
      next: () => {
        console.log('created')
      }
    })
  }

}

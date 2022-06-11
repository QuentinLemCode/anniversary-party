import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  name = '';
  ngOnInit(): void {
    this.name = this.route.snapshot.queryParams['name'];
  }
}

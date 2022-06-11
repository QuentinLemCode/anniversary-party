import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
})
export class ChallengeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  name = '';
  ngOnInit(): void {
    this.name = this.route.snapshot.queryParams['name'];
  }
}

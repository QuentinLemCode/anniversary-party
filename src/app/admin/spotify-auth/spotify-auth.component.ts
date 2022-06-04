import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-spotify-auth',
  templateUrl: './spotify-auth.component.html',
  styleUrls: ['./spotify-auth.component.scss']
})
export class SpotifyAuthComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state');
  }

}

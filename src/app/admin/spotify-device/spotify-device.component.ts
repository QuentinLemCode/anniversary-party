import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicApiService } from '../../services/music-api.service';

@Component({
  selector: 'app-spotify-device',
  templateUrl: './spotify-device.component.html',
  styleUrls: ['./spotify-device.component.scss']
})
export class SpotifyDeviceComponent implements OnInit {

  constructor(
    private music: MusicApiService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login() {
    this.music.getUrlLogin().subscribe({
      next: (url) => {
        window.location.href = url;
      }
    })
  }

}

import { Component } from '@angular/core';
import { MusicApiService } from '../../services/music-api.service';

@Component({
  selector: 'app-spotify-device',
  templateUrl: './spotify-device.component.html',
  styleUrls: ['./spotify-device.component.scss']
})
export class SpotifyDeviceComponent {

  constructor(
    private music: MusicApiService
    ) { }

  login() {
    this.music.getUrlLogin().subscribe({
      next: (url) => {
        window.location.href = url;
      }
    })
  }

}

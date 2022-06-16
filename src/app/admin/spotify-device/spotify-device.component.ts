import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { CurrentMusic } from '../../services/music-api.interface';
import { MusicApiService } from '../../services/music-api.service';

@Component({
  selector: 'app-spotify-device',
  templateUrl: './spotify-device.component.html',
  styleUrls: ['./spotify-device.component.scss'],
})
export class SpotifyDeviceComponent implements OnInit {
  error = '';
  musicStatus: CurrentMusic | null = null;

  get spotifyTokens() {
    return {
      code: this.route.snapshot.queryParamMap.get('code'),
      state: this.route.snapshot.queryParamMap.get('state'),
    };
  }

  constructor(private music: MusicApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // TODO Check referrer
    const { code, state } = this.spotifyTokens;
    if (!state && !code) {
      this.music.getStatus().subscribe({
        next: (status) => {
          this.musicStatus = status;
        },
      });
    } else if (code) {
      this.music
        .authenticatePlayer(code)
        .pipe(
          mergeMap(() => this.music.getStatus()),
          catchError(() => {
            this.error = "Couldn't authenticate player";
            return EMPTY;
          })
        )
        .subscribe({
          next: (status) => {
            this.musicStatus = status;
          },
        });
    } else {
      this.error = 'Invalid request';
    }
  }

  login() {
    this.music.getUrlLogin().subscribe({
      next: (url) => {
        window.location.href = url;
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicApiService } from '../../services/music-api.service';

@Component({
  selector: 'app-spotify-auth',
  templateUrl: './spotify-auth.component.html',
  styleUrls: ['./spotify-auth.component.scss']
})
export class SpotifyAuthComponent implements OnInit {
  error: string | null = null;
  authenticated = false;
  currentSong: string = '';

  constructor(private route: ActivatedRoute, private music: MusicApiService) { }

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state');
    if (!state) {
      this.error = 'invalid state';
      return;
    }
    if (code === null) {
      this.error = 'no code';
      return;
    }
    this.music.authenticatePlayer(code).subscribe({
      next: () => {
        this.authenticated = true;
      }
    });
  }

  getCurrentSong() {
    this.music.getPlaybackStatus().subscribe({
      next: (result: any) => {
        this.currentSong = result.item.name;
      }
    })
  }

}

import { Component, Input } from '@angular/core';
import { Music, Queue } from 'src/app/services/music-api.interface';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent {
  @Input()
  queue?: Queue;

  get music(): Music | undefined {
    return this.queue?.music;
  }

  vote() {
    console.log('clicked');
  }
}

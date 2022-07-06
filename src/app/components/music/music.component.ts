import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faForwardFast, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Music } from 'src/app/services/music-api.interface';

export interface MusicComponentConfiguration {
  votable: boolean;
  deletable: boolean;
  queueable: boolean;
}

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent implements OnInit {
  ngOnInit(): void {
    if (!this.config) {
      this.config = {
        votable: false,
        deletable: false,
        queueable: false,
      };
    }
  }
  @Input()
  username?: string;

  @Input()
  music?: Music;

  @Input()
  voteCount = 0;

  @Input()
  config?: MusicComponentConfiguration;

  @Output()
  vote = new EventEmitter<void>();

  @Output()
  delete = new EventEmitter<void>();

  @Output()
  addToQueue = new EventEmitter<void>();

  faTrash = faTrashCan;
  faForward = faForwardFast;
  faAdd = faPlus;
}

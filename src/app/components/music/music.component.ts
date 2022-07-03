import { Component, Input } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faForwardFast } from '@fortawesome/free-solid-svg-icons';
import { Music, Queue } from 'src/app/services/music-api.interface';
import { QueueService } from '../../services/queue.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent {
  constructor(
    private readonly service: QueueService,
    private readonly user: UserService
  ) {}
  @Input()
  queue?: Queue;

  faTrash = faTrashCan;
  faForward = faForwardFast;

  get music(): Music | undefined {
    return this.queue?.music;
  }

  get username(): string | undefined {
    return this.queue?.user.name;
  }

  get isAdmin(): boolean {
    return this.user.isAdmin();
  }

  vote() {
    if (!this.queue) return;
    this.service.forward(this.queue.id).subscribe();
  }

  delete() {
    if (!this.queue) {
      return;
    }
    this.service.delete(this.queue.id).subscribe();
  }
}

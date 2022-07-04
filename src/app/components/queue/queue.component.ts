import { Component, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { Queue } from '../../services/music-api.interface';
import { QueueService } from '../../services/queue.service';
import { UserService } from '../../services/user.service';
import { UnsubscribableComponent } from '../../utils/unsubscribable-component';
import { MusicComponentConfiguration } from '../music/music.component';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})
export class QueueComponent extends UnsubscribableComponent implements OnInit {
  queues: Queue[] | null = null;
  loading = true;
  error = '';

  musicConfig: MusicComponentConfiguration = {
    votable: this.user.isLoggedIn,
    deletable: this.user.isAdmin(),
    queueable: false,
  };

  constructor(
    private readonly queue: QueueService,
    private readonly user: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.queue
      .get()
      .pipe(
        takeUntil(this.$destroy),
        tap(() => (this.error = ''))
      )
      .subscribe({
        next: (queue) => {
          this.queues = queue;
          this.loading = false;
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
          this.error = "Erreur lors de l'obtention de la file d'attente";
        },
      });
  }

  delete(id: number) {
    this.queue.delete(id).subscribe();
  }

  vote(id: number) {
    this.queue.forward(id).subscribe();
  }
}

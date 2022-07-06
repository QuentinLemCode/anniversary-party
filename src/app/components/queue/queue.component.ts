import { Component, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { Queue } from '../../services/music-api.interface';
import { MusicApiService } from '../../services/music-api.service';
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
    votable: false,
    deletable: this.user.isAdmin(),
    queueable: false,
  };

  constructor(
    private readonly queue: QueueService,
    private readonly user: UserService,
    private readonly music: MusicApiService
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

    this.music
      .getStatus()
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (status) => {
          this.musicConfig = {
            votable: status.engineStarted && this.user.isLoggedIn,
            deletable: this.user.isAdmin(),
            queueable: false,
          };
        },
      });
  }

  delete(id: number) {
    this.queue.delete(id).subscribe();
  }

  vote(id: number) {
    this.queue.forward(id).subscribe({
      error: (error) => {
        if (error?.error?.cause === 'already-voted') {
          this.error = 'Vous avez déjà voté pour cette musique';
          setTimeout(() => (this.error = ''), 5000);
        }
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { mergeMap, takeUntil, tap } from 'rxjs/operators';
import { Queue } from '../../services/music-api.interface';
import { QueueService } from '../../services/queue.service';
import { UnsubscribableComponent } from '../../utils/unsubscribable-component';
import { MusicComponentConfiguration } from '../music/music.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent
  extends UnsubscribableComponent
  implements OnInit
{
  queues: Queue[] | null = null;
  loading = true;
  error = '';

  musicConfig: MusicComponentConfiguration = {
    votable: false,
    deletable: true,
    queueable: false,
    backlog: false,
  };

  constructor(private readonly queue: QueueService) {
    super();
  }

  ngOnInit(): void {
    this.queue
      .getBacklog()
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
    this.queue
      .delete(id)
      .pipe(mergeMap(() => this.queue.getBacklog()))
      .subscribe({
        next: (queue) => {
          this.queues = queue;
        },
      });
  }
}

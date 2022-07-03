import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Queue } from '../../services/music-api.interface';
import { QueueService } from '../../services/queue.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements OnInit {
  queues: Queue[] | null = null;
  loading = true;
  error = '';

  constructor(private readonly queue: QueueService) {}

  ngOnInit(): void {
    this.queue
      .get()
      .pipe(tap(() => (this.error = '')))
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
}

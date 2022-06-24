import { Component } from '@angular/core';
import { QueueService } from '../services/queue.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  $queue = this.queueService.get();
  constructor(private readonly queueService: QueueService) {}
}

import { Component } from '@angular/core';
import { QueueService } from '../queue.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-it05-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './it05-1.component.html',
  styleUrl: './it05-1.component.css',
})
export class It051Component {
  queue = '';

  constructor(private queueService: QueueService, private router: Router) {}

  ngOnInit() {
    this.queueService.loadQueue().subscribe((res) => {
      this.queue = res.queue;
    });
  }

  takeQueue() {
    this.queueService.getNextQueue().subscribe((res) => {
      this.router.navigate(['/it05-2'], {
        state: { queue: res.queue, time: res.time },
      });
    });
  }

  goReset() {
    this.router.navigate(['/it05-3']);
  }
}

import { Component } from '@angular/core';
import { QueueService } from '../queue.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-it05-3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './it05-3.component.html',
  styleUrl: './it05-3.component.css',
})
export class It053Component {
  queue = '';

  constructor(private queueService: QueueService, private router: Router) {}

  ngOnInit() {
    this.queueService.loadQueue().subscribe((res) => {
      this.queue = res.queue;
    });
  }

  resetQueue() {
    this.queueService.resetQueue().subscribe(() => {
      alert('ล้างคิวเรียบร้อย');
      this.queue = 'A0';
    });
  }

  goBack() {
    this.router.navigate(['/it05-1']);
  }
}

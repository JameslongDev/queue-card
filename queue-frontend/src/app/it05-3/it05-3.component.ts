import { Component } from '@angular/core';
import { QueueService } from '../queue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-it05-3',
  standalone: true,
  imports: [],
  templateUrl: './it05-3.component.html',
  styleUrl: './it05-3.component.css',
})
export class It053Component {
  constructor(
    private queueService: QueueService, 
    private router: Router
  ) {}

  resetQueue() {
    this.queueService.resetQueue().subscribe(() => {
      alert('ล้างคิวเรียบร้อย');
    });
  }

  goBack() {
    this.router.navigate(['/it05-1']);
  }
}

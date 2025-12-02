import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-it05-2',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './it05-2.component.html',
  styleUrl: './it05-2.component.css',
})
export class It052Component {
  queue = '';
  queueTime = new Date();

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state as any;
    this.queue = state?.queue || 'A0';
    this.queueTime = state?.time ? new Date(state.time) : new Date();
  }

  goBack() {
    this.router.navigate(['/it05-1']);
  }
}

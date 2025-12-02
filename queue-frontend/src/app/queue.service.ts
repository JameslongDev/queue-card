import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface QueueResponse {
  queue: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class QueueService {

   private apiUrl = '/api/queue'; // ใช้ proxy จาก Angular

  constructor(private http: HttpClient) {}

  getNextQueue(): Observable<QueueResponse> {
    return this.http.get<QueueResponse>(`${this.apiUrl}/next`);
  }

  resetQueue(): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset`, {});
  }
}

// announcement.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
    private apiURL = API_URL + 'api/v1/announcements';

  constructor(private http: HttpClient) {}

  getAnnouncements(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL);
  }
 

  createAnnouncement(announcement: { title: string; content: string }): Observable<any> {
    return this.http.post<any>(this.apiURL, announcement);
  }

  updateAnnouncement(id: string, announcement: any): Observable<void> {
    return this.http.put<void>(`${this.apiURL}/${id}`, announcement);
  }

  deleteAnnouncement(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}

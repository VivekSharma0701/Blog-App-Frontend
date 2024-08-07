import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnnouncementService } from '../../../core/service/announcement.component'; // Fixed import path
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit, OnDestroy {
  announcements: any[] = [];
  newAnnouncement = { title: '', content: '' }; 
  editingAnnouncement: any = null; // For holding the announcement being edited
  private fetchInterval: Subscription | undefined;
  showForm: boolean = false; 

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit() {
    this.fetchInterval = interval(60000).pipe(
      switchMap(() => this.announcementService.getAnnouncements())
    ).subscribe(data => {
      this.announcements = data;
    });

    this.announcementService.getAnnouncements().subscribe(data => {
      this.announcements = data;
    });
  }

  ngOnDestroy() {
    if (this.fetchInterval) {
      this.fetchInterval.unsubscribe();
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm(); // Reset form when hidden
    }
  }

  createAnnouncement() {
    if (this.newAnnouncement.title && this.newAnnouncement.content) {
      if (this.editingAnnouncement) {
        // Update existing announcement
        this.announcementService.updateAnnouncement(this.editingAnnouncement.id, this.newAnnouncement).subscribe(() => {
          this.resetForm();
          this.fetchAnnouncements();
        });
      } else {
        // Create new announcement
        this.announcementService.createAnnouncement(this.newAnnouncement).subscribe(() => {
          this.resetForm();
          this.fetchAnnouncements();
        });
      }
    }
  }

  editAnnouncement(announcement: any) {
    this.editingAnnouncement = { ...announcement }; // Clone the announcement for editing
    this.newAnnouncement = { ...announcement }; // Populate the form with existing data
    this.showForm = true; // Show the form
  }

  deleteAnnouncement(id: string) {
    this.announcementService.deleteAnnouncement(id).subscribe(() => {
      this.fetchAnnouncements();
    });
  }

  private fetchAnnouncements() {
    this.announcementService.getAnnouncements().subscribe(data => {
      this.announcements = data;
    });
  }

  private resetForm() {
    this.newAnnouncement = { title: '', content: '' };
    this.editingAnnouncement = null;
    this.toggleForm(); // Hide the form
  }
}

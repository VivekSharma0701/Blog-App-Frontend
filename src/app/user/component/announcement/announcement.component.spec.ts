import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnnouncementComponent } from './announcement.component';
import { AnnouncementService } from '../../../core/service/announcement.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AnnouncementComponent', () => {
  let component: AnnouncementComponent;
  let fixture: ComponentFixture<AnnouncementComponent>;
  let httpMock: HttpTestingController;
  let service: AnnouncementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ AnnouncementService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AnnouncementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch announcements on init', () => {
    const mockAnnouncements = [
      { title: 'Announcement 1', content: 'Content 1' },
      { title: 'Announcement 2', content: 'Content 2' }
    ];

    spyOn(service, 'getAnnouncements').and.returnValue(of(mockAnnouncements));

    fixture.detectChanges(); // triggers ngOnInit

    expect(component.announcements).toEqual(mockAnnouncements);
  });

  it('should fetch announcements every 60 seconds', fakeAsync(() => {
    const mockAnnouncements = [
      { title: 'Announcement 1', content: 'Content 1' },
      { title: 'Announcement 2', content: 'Content 2' }
    ];

    spyOn(service, 'getAnnouncements').and.returnValue(of(mockAnnouncements));

    fixture.detectChanges(); // triggers ngOnInit

    tick(60000); // simulate 60 seconds passing
    expect(service.getAnnouncements).toHaveBeenCalledTimes(2);
    expect(component.announcements).toEqual(mockAnnouncements);

    tick(60000); // simulate another 60 seconds passing
    expect(service.getAnnouncements).toHaveBeenCalledTimes(3);
  }));

  it('should display announcements in the template', () => {
    const mockAnnouncements = [
      { title: 'Announcement 1', content: 'Content 1' },
      { title: 'Announcement 2', content: 'Content 2' }
    ];

    spyOn(service, 'getAnnouncements').and.returnValue(of(mockAnnouncements));

    fixture.detectChanges(); // triggers ngOnInit
    fixture.detectChanges(); // update view

    const announcementElements = fixture.debugElement.queryAll(By.css('.announcement'));
    expect(announcementElements.length).toBe(2);
    expect(announcementElements[0].nativeElement.textContent).toContain('Announcement 1');
    expect(announcementElements[1].nativeElement.textContent).toContain('Announcement 2');
  });
});

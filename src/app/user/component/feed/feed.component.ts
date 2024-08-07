import { Component } from '@angular/core';
import { Post } from 'src/app/core/interface/post';
import { AnnouncementService } from 'src/app/core/service/announcement.component';
import { PostService } from 'src/app/core/service/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  posts: Post[] = [];
  isVisible: boolean = false; // if the dialog is open
  isEdit: boolean = false; // id the dialog is Edit or New
  post: Post = {};
  displayedPosts: any;
  rows: number = 2; // default rows per page
  first: number = 0; 
  announcements: any;
  allAnnouncementData: any;

  constructor(
    private postService: PostService,
    private Announcement:AnnouncementService
  ) { }

  ngOnInit() {
    this.getPosts();
    this.getAllDeatilsOfAnnouement();
  }

  getPosts() {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.updateDisplayedPosts();
        console.log(this.posts)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  paginate(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updateDisplayedPosts();
  }
  updateDisplayedPosts() {
    this.displayedPosts = this.posts.slice(this.first, this.first + this.rows);
  }
  getAllDeatilsOfAnnouement(){
    this.Announcement.getAnnouncements().subscribe((data)=>{
      this.allAnnouncementData = data
      console.log(this.allAnnouncementData)
    })
  }
  
  
}

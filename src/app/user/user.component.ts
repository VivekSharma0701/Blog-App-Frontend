import { Component } from '@angular/core';
import { AuthService } from '../core/service/auth.service';
import { Router } from '@angular/router';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})


export class UserComponent {

  contactOptions = [
    { label: 'Contact_Us', value: 'https://walkingtree.tech/contact-us/' },
    { label: 'Website', value: 'https://walkingtree.tech/' }
   
  ];
selectedContactOption: any;


// handleContactOptionChange($event: DropdownChangeEvent) {
// throw new Error('Method not implemented.');
// }
handleContactOptionChange(event: any) {
  if (event.value) {
    window.open(event.value, '_blank');
  }
}
  currentUsername: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCurrentUsername();
  }

  getCurrentUsername() {
    this.currentUsername = this.authService.getCurrentUsername();
  }

  logout() {
    this.authService.removeToken();
    this.authService.removeCurrentUsername();
    this.router.navigate(['/login']);
  }
  contactUs() {
    // Navigate to the desired URL. You can use a different URL or route.
    window.open('mailto:contact@example.com'); // Opens the default email client
    // Or
    // this.router.navigate(['/contact']); // Navigate to a specific route
  }
}

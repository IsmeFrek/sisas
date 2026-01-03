import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  userName: string = '';
  profileImage: string = '';

  constructor() {
    // Try to get user info from localStorage (set on login)
    const user = localStorage.getItem('user_info');
    if (user) {
      try {
        const userObj = JSON.parse(user);
        this.userName = userObj.username;
        if (userObj.profileImage) {
          // If image is a relative path, prepend backend URL
          this.profileImage = userObj.profileImage.startsWith('http') ? userObj.profileImage : ('http://localhost:5000/' + userObj.profileImage);
        } else {
          // this.profileImage = 'assets/PF_Image12.jpg';
        }
      } catch {
        this.userName = user;
        // this.profileImage = 'assets/PF_Image12.jpg';
      }
    } else {
      // this.profileImage = 'assets/PF_Image12.jpg';
    }
  }

  logout() {
    // Clear auth and user info, then reload
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    window.location.reload();
  }
}

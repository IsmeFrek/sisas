import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  logout() {
    // Demo: just alert, real app should clear user and redirect
    alert('Logged out!');
  }
}

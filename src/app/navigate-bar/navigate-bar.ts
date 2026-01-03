import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigate-bar',
  imports: [RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './navigate-bar.html',
  styleUrls: ['./navigate-bar.css'],
})
export class NavigateBar {
  isSetupDropdownOpen = false;
  isSettingDropdownOpen = false;

  email: string | null = null;

  constructor() {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);
        this.email = user.email || null;
      } catch {
        this.email = null;
      }
    }
  }

  toggleSetupDropdown() {
    this.isSetupDropdownOpen = !this.isSetupDropdownOpen;
  }

  toggleSettingDropdown() {
    this.isSettingDropdownOpen = !this.isSettingDropdownOpen;
  }
}

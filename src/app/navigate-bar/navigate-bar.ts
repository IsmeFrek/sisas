import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigate-bar',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navigate-bar.html',
  styleUrls: ['./navigate-bar.css'],
})
export class NavigateBar {
  isSetupDropdownOpen = false;
  isSettingDropdownOpen = false;

  toggleSetupDropdown() {
    this.isSetupDropdownOpen = !this.isSetupDropdownOpen;
  }

  toggleSettingDropdown() {
    this.isSettingDropdownOpen = !this.isSettingDropdownOpen;
  }
}

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigateBar } from "./navigate-bar/navigate-bar";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { Login } from "./login/login";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavigateBar, Footer, Header, Login],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Final-Project');
  get isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  }
}

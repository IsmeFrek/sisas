import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigateBar } from "./navigate-bar/navigate-bar";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigateBar, Footer, Header],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Final-Project');
}

import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AutoLogoutService {
  private timeoutId: any;
  private readonly timeoutMs = 15 * 60 * 1000; // 15 minutes of inactivity

  constructor(private ngZone: NgZone, private router: Router) {
    this.initListener();
    this.reset();
  }

  private initListener() {
    // Events that indicate user activity
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll', 'click'];
    
    // Run event listeners outside Angular zone for better performance
    this.ngZone.runOutsideAngular(() => {
      events.forEach(event => {
        window.addEventListener(event, () => this.reset(), { passive: true });
      });
      window.addEventListener('focus', () => this.reset());
    });
  }

  private reset() {
    // Only reset if user is logged in
    if (!localStorage.getItem('auth_token')) {
      return;
    }

    // Clear existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Set new timeout for 15 minutes of inactivity
    this.timeoutId = setTimeout(() => {
      this.ngZone.run(() => this.logout());
    }, this.timeoutMs);
  }

  private logout() {
    // Clear user data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    
    // Redirect to login page
    this.router.navigate(['/login']);
  }

  // Method to manually logout (for logout button)
  public manualLogout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.logout();
  }
}

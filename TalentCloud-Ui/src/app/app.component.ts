import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { authActions } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .main-content {
      flex: 1;
      padding: var(--space-4);
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    
    @media (max-width: 768px) {
      .main-content {
        padding: var(--space-2);
      }
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    // Check if user is already authenticated
    this.store.dispatch(authActions.checkAuth());
  }
}
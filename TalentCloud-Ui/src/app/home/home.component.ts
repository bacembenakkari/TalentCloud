import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../auth/store/auth.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container fade-in">
      <header class="hero">
        <h1>Angular Microservices</h1>
        <p class="subtitle">A scalable architecture with authentication and profile services</p>
        
        <div class="cta-buttons">
          <a 
            *ngIf="!(isAuthenticated$ | async)" 
            routerLink="/auth/login" 
            class="btn btn-primary"
          >
            Get Started
          </a>
          <a 
            *ngIf="(isAuthenticated$ | async)" 
            routerLink="/profile" 
            class="btn btn-primary"
          >
            Go to Profile
          </a>
        </div>
      </header>

      <section class="features">
        <h2>Features</h2>
        
        <div class="feature-grid">
          <div class="feature-card">
            <h3>Authentication Service</h3>
            <p>Secure login and registration with JWT authentication</p>
          </div>
          
          <div class="feature-card">
            <h3>Profile Service</h3>
            <p>Manage user profiles with detailed information</p>
          </div>
          
          <div class="feature-card">
            <h3>Nx Workspace</h3>
            <p>Organized monorepo structure for better code sharing</p>
          </div>
          
          <div class="feature-card">
            <h3>State Management</h3>
            <p>NgRx for predictable state management across services</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .hero {
      text-align: center;
      padding: var(--space-16) var(--space-4);
      margin-bottom: var(--space-12);
    }
    
    .hero h1 {
      font-size: 3rem;
      margin-bottom: var(--space-4);
      color: var(--color-primary-700);
    }
    
    .subtitle {
      font-size: var(--font-size-xl);
      color: var(--color-gray-600);
      margin-bottom: var(--space-8);
    }
    
    .cta-buttons {
      margin-top: var(--space-8);
    }
    
    .cta-buttons .btn {
      padding: var(--space-3) var(--space-6);
      font-size: var(--font-size-lg);
    }
    
    .features {
      padding: var(--space-8) var(--space-4);
    }
    
    .features h2 {
      text-align: center;
      margin-bottom: var(--space-8);
    }
    
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--space-6);
    }
    
    .feature-card {
      background-color: white;
      border-radius: var(--border-radius-lg);
      padding: var(--space-6);
      box-shadow: var(--shadow-md);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .feature-card h3 {
      color: var(--color-primary-600);
      margin-bottom: var(--space-2);
    }
    
    @media (max-width: 768px) {
      .hero {
        padding: var(--space-8) var(--space-4);
      }
      
      .hero h1 {
        font-size: 2.5rem;
      }
      
      .feature-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  
  constructor(private store: Store) {}
}
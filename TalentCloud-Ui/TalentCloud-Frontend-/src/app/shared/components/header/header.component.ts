import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated, selectUser } from '../../../auth/store/auth.selectors';
import { authActions } from '../../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="main-header">
      <div class="header-container">
        <div class="logo">
          <a routerLink="/">Angular Microservices</a>
        </div>
        
        <nav class="main-nav">
          <ul>
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
            <ng-container *ngIf="!(isAuthenticated$ | async)">
              <li><a routerLink="/auth/login" routerLinkActive="active">Login</a></li>
              <li><a routerLink="/auth/register" routerLinkActive="active">Register</a></li>
            </ng-container>
            <ng-container *ngIf="(isAuthenticated$ | async)">
              <li><a routerLink="/profile" routerLinkActive="active">Profile</a></li>
              <li><a (click)="logout()" class="logout-link">Logout</a></li>
            </ng-container>
          </ul>
        </nav>
        
        <div class="user-info" *ngIf="(user$ | async) as user">
          <div class="user-name">{{ user }}</div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .main-header {
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-4);
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .logo a {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary-700);
      text-decoration: none;
    }
    
    .main-nav ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: var(--space-6);
    }
    
    .main-nav a {
      color: var(--color-gray-700);
      text-decoration: none;
      font-weight: var(--font-weight-medium);
      padding: var(--space-2) 0;
      position: relative;
      transition: color 0.2s ease;
    }
    
    .main-nav a.active,
    .main-nav a:hover {
      color: var(--color-primary-600);
    }
    
    .main-nav a.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--color-primary-600);
    }
    
    .logout-link {
      cursor: pointer;
    }
    
    .user-info {
      display: flex;
      align-items: center;
    }
    
    .user-name {
      font-weight: var(--font-weight-medium);
      color: var(--color-gray-700);
    }
    
    @media (max-width: 768px) {
      .header-container {
        flex-direction: column;
        align-items: flex-start;
        padding: var(--space-2);
      }
      
      .main-nav {
        width: 100%;
        margin-top: var(--space-2);
      }
      
      .main-nav ul {
        gap: var(--space-2);
        flex-wrap: wrap;
      }
      
      .user-info {
        margin-top: var(--space-2);
      }
    }
  `]
})
export class HeaderComponent {
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  user$ = this.store.select(selectUser);
  
  constructor(private store: Store) {}
  
  logout() {
    this.store.dispatch(authActions.logout());
  }
}
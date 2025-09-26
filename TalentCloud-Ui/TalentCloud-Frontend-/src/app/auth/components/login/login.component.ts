import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/auth.actions';
import { selectAuthError, selectIsLoading } from '../../store/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container fade-in">
      <div class="auth-card">
        <h2>Login</h2>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">username</label>
            <input 
              type="username" 
              id="username" 
              formControlName="username" 
              placeholder="Enter your username"
              [ngClass]="{'input-error': hasError('username')}"
            >
            <div class="error-message" *ngIf="hasError('email')">
              <span *ngIf="loginForm.get('username')?.errors?.['required']">Email is required</span>
              <span *ngIf="loginForm.get('username')?.errors?.['email']">Enter a valid email</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password" 
              placeholder="Enter your password"
              [ngClass]="{'input-error': hasError('password')}"
            >
            <div class="error-message" *ngIf="hasError('password')">
              <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
              <span *ngIf="loginForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
            </div>
          </div>
          
          <div class="auth-error" *ngIf="(error$ | async)">
            {{ error$ | async }}
          </div>
          
          <button 
            type="submit" 
            class="btn btn-primary btn-block" 
            [disabled]="loginForm.invalid || (isLoading$ | async)"
          >
            <div class="spinner-sm" *ngIf="isLoading$ | async"></div>
            <span *ngIf="!(isLoading$ | async)">Login</span>
          </button>
        </form>
        
        <div class="auth-footer">
          Don't have an account? 
          <a routerLink="/auth/register">Register</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 70vh;
    }
    
    .auth-card {
      background-color: white;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-8);
      width: 100%;
      max-width: 400px;
    }
    
    .auth-card h2 {
      text-align: center;
      margin-bottom: var(--space-6);
      color: var(--color-primary-700);
    }
    
    .form-group {
      margin-bottom: var(--space-4);
    }
    
    label {
      display: block;
      margin-bottom: var(--space-2);
      font-weight: var(--font-weight-medium);
    }
    
    .input-error {
      border-color: var(--color-error-500);
    }
    
    .error-message {
      color: var(--color-error-500);
      font-size: var(--font-size-sm);
      margin-top: var(--space-1);
    }
    
    .auth-error {
      background-color: rgba(239, 68, 68, 0.1);
      color: var(--color-error-500);
      padding: var(--space-2);
      border-radius: var(--border-radius-sm);
      margin-bottom: var(--space-4);
      text-align: center;
    }
    
    .btn-block {
      width: 100%;
      padding: var(--space-3) 0;
      margin-top: var(--space-4);
    }
    
    .auth-footer {
      text-align: center;
      margin-top: var(--space-6);
      font-size: var(--font-size-sm);
      color: var(--color-gray-600);
    }
    
    .spinner-sm {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
      margin: 0 auto;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading$ = this.store.select(selectIsLoading);
  error$ = this.store.select(selectAuthError);
  
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  hasError(field: string): boolean {
    return this.loginForm.get(field)?.invalid && 
           (this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty) || false;
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(authActions.login(this.loginForm.value));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
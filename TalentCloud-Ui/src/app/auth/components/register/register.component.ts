import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthError } from '../../store/auth.selectors';
import { authActions } from '../../store/auth.actions';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container fade-in">
      <div class="auth-card">
        <h2>Register</h2>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              formControlName="username" 
              placeholder="Enter your username"
              [ngClass]="{'input-error': hasError('username')}"
            >
            <div class="error-message" *ngIf="hasError('username')">
              <span *ngIf="registerForm.get('username')?.errors?.['required']">Username is required</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email" 
              placeholder="Enter your email"
              [ngClass]="{'input-error': hasError('email')}"
            >
            <div class="error-message" *ngIf="hasError('email')">
              <span *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="registerForm.get('email')?.errors?.['email']">Enter a valid email</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              formControlName="firstName" 
              placeholder="Enter your first name"
              [ngClass]="{'input-error': hasError('firstName')}"
            >
            <div class="error-message" *ngIf="hasError('firstName')">
              <span *ngIf="registerForm.get('firstName')?.errors?.['required']">First name is required</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="lastname">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              formControlName="lastName" 
              placeholder="Enter your last name"
              [ngClass]="{'input-error': hasError('lastName')}"
            >
            <div class="error-message" *ngIf="hasError('lastName')">
              <span *ngIf="registerForm.get('lastName')?.errors?.['required']">Last name is required</span>
            </div>
          </div>
          
          <div class="form-group">
            <label>Select Role</label>
            <div class="role-selection">
              <div class="role-option">
                <input 
                  type="checkbox" 
                  id="roleCandidate" 
                  (change)="onRoleChange('Candidate', $event)"
                  [checked]="registerForm.get('role')?.value === 'Candidate'"
                >
                <label for="roleCandidate" class="role-label">Candidate</label>
              </div>
              <div class="role-option">
                <input 
                  type="checkbox" 
                  id="roleClient" 
                  (change)="onRoleChange('Client', $event)"
                  [checked]="registerForm.get('role')?.value === 'Client'"
                >
                <label for="roleClient" class="role-label">Client</label>
              </div>
            </div>
            <div class="error-message" *ngIf="hasError('role')">
              <span *ngIf="registerForm.get('role')?.errors?.['required']">Please select a role</span>
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
              <span *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</span>
              <span *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              formControlName="confirmPassword" 
              placeholder="Confirm your password"
              [ngClass]="{'input-error': hasError('confirmPassword')}"
            >
            <div class="error-message" *ngIf="hasError('confirmPassword')">
              <span *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">Confirm password is required</span>
              <span *ngIf="registerForm.get('confirmPassword')?.errors?.['passwordMismatch']">Passwords don't match</span>
            </div>
          </div>
          
          <div class="auth-error" *ngIf="(error$ | async)">
            {{ error$ | async }}
          </div>
          
          <button 
            type="submit" 
            class="btn btn-primary btn-block" 
            [disabled]="registerForm.invalid"
          >
            <span>Register</span>
          </button>
        </form>
        
        <div class="auth-footer">
          Already have an account? 
          <a routerLink="/auth/login">Login</a>
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
    
    .role-selection {
      display: flex;
      gap: var(--space-4);
      margin-bottom: var(--space-2);
    }
    
    .role-option {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    
    .role-label {
      margin-bottom: 0;
      cursor: pointer;
    }
  `]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  error$ = this.store.select(selectAuthError);
  submitted = false;
  private authSubscription: Subscription | null = null;
  private registrationSuccess: Subscription | null = null;
  
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required], // Added required validator
      lastName: ['', Validators.required], // Added required validator
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required], // Added required validator for role
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
  
  ngOnInit() {
    // Subscribe to the registration success action
    this.authSubscription = this.store.select(state => state)
      .subscribe(() => {
        this.error$.pipe(take(1)).subscribe(error => {
          // If there's no error after form submission, redirect to login
          if (!error && this.submitted) {
            this.redirectToLogin();
          }
        });
      });
      
    // We also need to subscribe to successful registration response
    // This assumes you have an effect that handles API responses
    // You may need to modify this part according to your store structure
  
  }
  
  ngOnDestroy() {
    // Clean up subscriptions when component is destroyed
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.registrationSuccess) {
      this.registrationSuccess.unsubscribe();
    }
  }
  
  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      g.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }
  
  hasError(field: string): boolean {
    return (this.submitted || this.registerForm.get(field)?.touched || this.registerForm.get(field)?.dirty) && 
           this.registerForm.get(field)?.invalid || false;
  }
  
  // Handle role selection with checkboxes
  onRoleChange(role: string, event: any) {
    const isChecked = event.target.checked;
    
    if (isChecked) {
      // When a role is selected, set the form control value
      this.registerForm.get('role')?.setValue(role);
      // Ensure the other checkbox is unchecked (UI)
      if (role === 'Candidate') {
        const clientCheckbox = document.getElementById('roleClient') as HTMLInputElement;
        if (clientCheckbox) clientCheckbox.checked = false;
      } else {
        const candidateCheckbox = document.getElementById('roleCandidate') as HTMLInputElement;
        if (candidateCheckbox) candidateCheckbox.checked = false;
      }
    } else {
      // If the checkbox is unchecked, clear the role
      this.registerForm.get('role')?.setValue('');
    }
  }
  
  // Redirect to login page
  redirectToLogin() {
    console.log('Registration successful, redirecting to login page');
    this.router.navigate(['/auth/login']);
  }
  
  onSubmit() {
    this.submitted = true;
    
    console.log('Form validation status:', this.registerForm.valid);
    console.log('Form errors:', this.registerForm.errors);
    console.log('Form values:', this.registerForm.value);

    if (this.registerForm.valid) {
      console.log('Form validated, preparing to send');
      const { confirmPassword, ...userData } = this.registerForm.value;
      console.log('Prepared data:', userData);
      this.store.dispatch(authActions.register(userData));
      console.log('Action dispatched');
    } else {
      console.log('Form invalid - error details by field:');
      Object.keys(this.registerForm.controls).forEach(key => {
        console.log(`Field ${key}:`, this.registerForm.get(key)?.errors);
      });
      this.markFormGroupTouched(this.registerForm);
    }
  }
  
  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
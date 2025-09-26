import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { selectUserProfile, selectProfileError, selectProfileLoading } from '../../store/profile.selectors';
import { profileActions } from '../../store/profile.actions';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="edit-profile-container fade-in">
      <div class="edit-profile-header">
        <h1>Edit Profile</h1>
        <a routerLink="/profile" class="btn btn-secondary">Cancel</a>
      </div>
      
      <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" *ngIf="!(isLoading$ | async); else loading">
        <div class="form-card">
          <div class="form-section">
            <h2>Personal Information</h2>
            
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  formControlName="firstName" 
                  placeholder="Enter your first name"
                >
              </div>
              
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  formControlName="lastName" 
                  placeholder="Enter your last name"
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="bio">Bio</label>
              <textarea 
                id="bio" 
                formControlName="bio" 
                placeholder="Tell us about yourself"
                rows="4"
              ></textarea>
            </div>
          </div>
          
          <div class="form-section">
            <h2>Contact Information</h2>
            
            <div class="form-group">
              <label for="phoneNumber">Phone Number</label>
              <input 
                type="tel" 
                id="phoneNumber" 
                formControlName="phoneNumber" 
                placeholder="Enter your phone number"
              >
            </div>
            
            <div class="form-group">
              <label for="location">Location</label>
              <input 
                type="text" 
                id="location" 
                formControlName="location" 
                placeholder="City, Country"
              >
            </div>
            
            <div class="form-group">
              <label for="website">Website</label>
              <input 
                type="url" 
                id="website" 
                formControlName="website" 
                placeholder="https://example.com"
              >
              <div class="error-message" *ngIf="profileForm.get('website')?.errors?.['pattern'] && profileForm.get('website')?.touched">
                Please enter a valid URL (e.g., https://example.com)
              </div>
            </div>
          </div>
          
          <div class="form-section">
            <h2>Interests</h2>
            
            <div class="form-group">
              <label for="interests">Interests (comma separated)</label>
              <input 
                type="text" 
                id="interests" 
                formControlName="interestsInput" 
                placeholder="e.g., programming, music, hiking"
              >
              <div class="hint">Separate interests with commas</div>
            </div>
          </div>
          
          <div class="error-message" *ngIf="(error$ | async)">
            {{ error$ | async }}
          </div>
          
          <div class="form-actions">
            <button 
              type="button" 
              class="btn btn-secondary" 
              routerLink="/profile"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="btn btn-primary" 
              [disabled]="profileForm.invalid || (isLoading$ | async)"
            >
              <div class="spinner-sm" *ngIf="isLoading$ | async"></div>
              <span *ngIf="!(isLoading$ | async)">Save Changes</span>
            </button>
          </div>
        </div>
      </form>
      
      <ng-template #loading>
        <div class="loading-container">
          <div class="spinner"></div>
          <p>Loading profile data...</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .edit-profile-container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .edit-profile-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-6);
    }
    
    .form-card {
      background-color: white;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
      overflow: hidden;
    }
    
    .form-section {
      padding: var(--space-6);
      border-bottom: 1px solid var(--color-gray-200);
    }
    
    .form-section:last-of-type {
      border-bottom: none;
    }
    
    .form-section h2 {
      margin-bottom: var(--space-4);
      font-size: var(--font-size-xl);
      color: var(--color-primary-700);
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
      margin-bottom: var(--space-4);
    }
    
    .form-group {
      margin-bottom: var(--space-4);
    }
    
    .form-group label {
      display: block;
      margin-bottom: var(--space-2);
      font-weight: var(--font-weight-medium);
    }
    
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: var(--space-2) var(--space-3);
      border: 1px solid var(--color-gray-300);
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-base);
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--color-primary-400);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
    
    .error-message {
      color: var(--color-error-500);
      font-size: var(--font-size-sm);
      margin-top: var(--space-1);
    }
    
    .hint {
      font-size: var(--font-size-sm);
      color: var(--color-gray-500);
      margin-top: var(--space-1);
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-4);
      padding: var(--space-6);
      background-color: var(--color-gray-50);
      border-top: 1px solid var(--color-gray-200);
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-12);
    }
    
    .loading-container p {
      margin-top: var(--space-4);
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
    
    @media (max-width: 768px) {
      .edit-profile-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-4);
      }
      
      .form-row {
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }
      
      .form-actions {
        flex-direction: column;
      }
      
      .form-actions button {
        width: 100%;
      }
    }
  `]
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoading$ = this.store.select(selectProfileLoading);
  error$ = this.store.select(selectProfileError);
  
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      bio: [''],
      phoneNumber: [''],
      location: [''],
      website: ['', [Validators.pattern('https?://.+')]],
      interestsInput: ['']
    });
  }
  
  ngOnInit() {
    this.store.dispatch(profileActions.loadProfile());
    
    this.store.select(selectUserProfile)
      .pipe(take(1))
      .subscribe(profile => {
        if (profile) {
          this.profileForm.patchValue({
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            bio: profile.bio || '',
            phoneNumber: profile.phoneNumber || '',
            location: profile.location || '',
            website: profile.website || '',
            interestsInput: profile.interests?.join(', ') || ''
          });
        }
      });
  }
  
  onSubmit() {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      
      // Convert comma-separated interests to array
      const interests = formData.interestsInput
        ? formData.interestsInput.split(',').map((item: string) => item.trim()).filter((item: string) => item)
        : [];
      
      // Prepare profile data for update
      const profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
        phoneNumber: formData.phoneNumber,
        location: formData.location,
        website: formData.website,
        interests
      };
      
      this.store.dispatch(profileActions.updateProfile({ profile: profileData }));
    }
  }
}
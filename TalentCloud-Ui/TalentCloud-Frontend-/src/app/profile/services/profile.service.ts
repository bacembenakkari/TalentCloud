// src/app/profile/services/profile.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from '../../shared/services/api.service';
import { UserProfile } from '../../shared/models/user.model';
import { ProfileData, EducationItem, ExperienceItem, AdditionalInfoItem } from '../../shared/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // BehaviorSubjects to store component-specific data
  private profileDataSubject = new BehaviorSubject<ProfileData>({
    name: '',
    email: '',
    about: '',
    dateOfBirth: '',
    phone: '',
    gender: '',
    linkedinUrl: '',
    location: '',
    portfolioUrl: '',
    stats: {
      following: 0,
      likes: 0,
      followers: 0
    }
  });
  
  private educationFieldsSubject = new BehaviorSubject<EducationItem[]>([]);
  private experienceFieldsSubject = new BehaviorSubject<ExperienceItem[]>([]);
  private additionalInfoFieldsSubject = new BehaviorSubject<AdditionalInfoItem[]>([]);
  
  // Expose as Observables
  profileData$ = this.profileDataSubject.asObservable();
  educationFields$ = this.educationFieldsSubject.asObservable();
  experienceFields$ = this.experienceFieldsSubject.asObservable();
  additionalInfoFields$ = this.additionalInfoFieldsSubject.asObservable();
  
  constructor(private apiService: ApiService) {}
  
  getUserProfile(): Observable<UserProfile> {
    return this.apiService.get<UserProfile>('/profile').pipe(
      tap(profile => {
        // Update subjects with the retrieved data
        if (profile) {
          if (profile.profileData) {
            this.profileDataSubject.next(profile.profileData);
          }
          if (profile.education) {
            this.educationFieldsSubject.next(profile.education);
          }
          if (profile.experience) {
            this.experienceFieldsSubject.next(profile.experience);
          }
          if (profile.additionalInfo) {
            this.additionalInfoFieldsSubject.next(profile.additionalInfo);
          }
        }
      }),
      catchError(error => {
        return throwError(() => error?.error?.message || 'Failed to load profile');
      })
    );
  }
  
  updateUserProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    return this.apiService.put<UserProfile>('/profile', profile).pipe(
      tap(updatedProfile => {
        // Update subjects with the updated data
        if (updatedProfile) {
          if (updatedProfile.profileData) {
            this.profileDataSubject.next(updatedProfile.profileData);
          }
          if (updatedProfile.education) {
            this.educationFieldsSubject.next(updatedProfile.education);
          }
          if (updatedProfile.experience) {
            this.experienceFieldsSubject.next(updatedProfile.experience);
          }
          if (updatedProfile.additionalInfo) {
            this.additionalInfoFieldsSubject.next(updatedProfile.additionalInfo);
          }
        }
      }),
      catchError(error => {
        return throwError(() => error?.error?.message || 'Failed to update profile');
      })
    );
  }
  
  // Methods for updating specific fields
  updateEducationField(key: string, value: string): void {
    const currentFields = this.educationFieldsSubject.getValue();
    const updatedFields = currentFields.map(field => 
      field.key === key ? { ...field, value } : field
    );
    this.educationFieldsSubject.next(updatedFields);
    
    // Optionally update the server
    const updatedProfile: Partial<UserProfile> = {
      education: updatedFields
    };
    this.updateUserProfile(updatedProfile).subscribe();
  }
  
  updateExperienceField(key: string, value: string): void {
    const currentFields = this.experienceFieldsSubject.getValue();
    const updatedFields = currentFields.map(field => 
      field.key === key ? { ...field, value } : field
    );
    this.experienceFieldsSubject.next(updatedFields);
    
    // Optionally update the server
    const updatedProfile: Partial<UserProfile> = {
      experience: updatedFields
    };
    this.updateUserProfile(updatedProfile).subscribe();
  }
  
  updateAdditionalInfoField(key: string, value: string): void {
    const currentFields = this.additionalInfoFieldsSubject.getValue();
    const updatedFields = currentFields.map(field => 
      field.key === key ? { ...field, value } : field
    );
    this.additionalInfoFieldsSubject.next(updatedFields);
    
    // Optionally update the server
    const updatedProfile: Partial<UserProfile> = {
      additionalInfo: updatedFields
    };
    this.updateUserProfile(updatedProfile).subscribe();
  }
}
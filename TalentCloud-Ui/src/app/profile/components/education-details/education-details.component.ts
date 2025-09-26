// src/app/profile/components/education-details/education-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';
import { EducationItem } from '../../../shared/models/profile.model';
import { selectUserProfile } from '../../store/profile.selectors';
import { profileActions } from '../../store/profile.actions';

@Component({
  selector: 'app-education-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.css']
})
export class EducationDetailsComponent implements OnInit {
  profileFields: EducationItem[] = [];
  editingField: string | null = null;
  
  constructor(
    private store: Store,
    private profileService: ProfileService
  ) {}
  
  ngOnInit() {
    // Subscribe to the store to get education fields
    this.store.select(selectUserProfile).pipe(
      map(profile => profile?.education || [])
    ).subscribe(fields => {
      if (fields.length > 0) {
        this.profileFields = fields;
      }
    });
    
    // Also subscribe to the service as a fallback
    this.profileService.educationFields$.subscribe(fields => {
      if (fields.length > 0) {
        this.profileFields = fields;
      }
    });
  }
  
  editField(key: string): void {
    this.editingField = key;
  }
  
  saveField(item?: EducationItem): void {
    if (this.editingField) {
      const field = item || this.profileFields.find(f => f.key === this.editingField);
      if (field) {
        // Update in the service
        this.profileService.updateEducationField(field.key, field.value);
        
        // Also update in the store
        this.store.select(selectUserProfile).pipe(
          map(profile => {
            if (profile) {
              const updatedEducation = profile.education.map(f => 
                f.key === field.key ? field : f
              );
              
              return {
                ...profile,
                education: updatedEducation
              };
            }
            return null;
          })
        ).subscribe(updatedProfile => {
          if (updatedProfile) {
            this.store.dispatch(profileActions.updateProfile({ 
              profile: { education: updatedProfile.education } 
            }));
          }
        });
        
        this.editingField = null;
      }
    }
  }
}
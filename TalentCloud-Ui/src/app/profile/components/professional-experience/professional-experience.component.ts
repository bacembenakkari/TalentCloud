// src/app/profile/components/professional-experience/professional-experience.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';
import { ExperienceItem } from '../../../shared/models/profile.model';
import { selectUserProfile } from '../../store/profile.selectors';
import { profileActions } from '../../store/profile.actions';

@Component({
  selector: 'app-professional-experience',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.css']
})
export class ProfessionalExperienceComponent implements OnInit {
  experienceFields: ExperienceItem[] = [];
  editingField: string | null = null;
  
  constructor(
    private store: Store,
    private profileService: ProfileService
  ) {}
  
  ngOnInit() {
    // Subscribe to the store
    this.store.select(selectUserProfile).pipe(
      map(profile => profile?.experience || [])
    ).subscribe(fields => {
      if (fields.length > 0) {
        this.experienceFields = fields;
      }
    });
    
    // Also subscribe to the service as a fallback
    this.profileService.experienceFields$.subscribe(fields => {
      if (fields.length > 0) {
        this.experienceFields = fields;
      }
    });
  }
  
  editField(key: string): void {
    this.editingField = key;
  }
  
  saveField(): void {
    if (this.editingField) {
      const field = this.experienceFields.find(f => f.key === this.editingField);
      if (field) {
        // Update in the service
        this.profileService.updateExperienceField(field.key, field.value);
        
        // Also update in the store
        this.store.select(selectUserProfile).pipe(
          map(profile => {
            if (profile) {
              const updatedExperience = profile.experience.map(f => 
                f.key === field.key ? field : f
              );
              
              return {
                ...profile,
                experience: updatedExperience
              };
            }
            return null;
          })
        ).subscribe(updatedProfile => {
          if (updatedProfile) {
            this.store.dispatch(profileActions.updateProfile({ 
              profile: { experience: updatedProfile.experience } 
            }));
          }
        });
        
        this.editingField = null;
      }
    }
  }
}
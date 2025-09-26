// src/app/store/profile/profile.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserProfile } from '../../shared/models/user.model';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    // Load profile actions
    'Load Profile': emptyProps(),
    'Load Profile Success': props<{ profile: UserProfile }>(),
    'Load Profile Failure': props<{ error: string }>(),
    
    // Update profile actions
    'Update Profile': props<{ profile: Partial<UserProfile> }>(),
    'Update Profile Success': props<{ profile: UserProfile }>(),
    'Update Profile Failure': props<{ error: string }>()
  }
});
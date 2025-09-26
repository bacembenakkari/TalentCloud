import { createFeature, createReducer, on } from '@ngrx/store';
import { UserProfile } from '../../shared/models/user.model';
import { profileActions } from './profile.actions';

export interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null
};

export const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    initialState,
    
    // Load profile actions
    on(profileActions.loadProfile, (state) => ({
      ...state,
      isLoading: true,
      error: null
    })),
    on(profileActions.loadProfileSuccess, (state, { profile }) => ({
      ...state,
      profile,
      isLoading: false,
      error: null
    })),
    on(profileActions.loadProfileFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error
    })),
    
    // Update profile actions
    on(profileActions.updateProfile, (state) => ({
      ...state,
      isLoading: true,
      error: null
    })),
    on(profileActions.updateProfileSuccess, (state, { profile }) => ({
      ...state,
      profile,
      isLoading: false,
      error: null
    })),
    on(profileActions.updateProfileFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error
    }))
  )
});
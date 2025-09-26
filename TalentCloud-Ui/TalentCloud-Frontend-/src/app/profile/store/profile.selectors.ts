// src/app/profile/store/profile.selectors.ts
import { profileFeature } from './profile.reducer';

export const {
  selectProfile: selectUserProfile,
  selectIsLoading: selectProfileLoading,
  selectError: selectProfileError
} = profileFeature;
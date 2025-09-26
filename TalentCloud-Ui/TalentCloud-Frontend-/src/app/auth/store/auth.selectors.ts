import { authFeature } from './auth.reducer';

export const {
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectError: selectAuthError
} = authFeature;
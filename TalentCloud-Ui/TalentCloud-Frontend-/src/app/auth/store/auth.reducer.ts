import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import { authActions } from './auth.actions';
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  registrationStatus: number | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  registrationStatus: null
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    
    // Login actions
    on(authActions.login, (state) => ({
      ...state,
      isLoading: true,
      error: null
    })),
    on(authActions.loginSuccess, (state, { user }) => ({
      ...state,
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null
    })),
    on(authActions.loginFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error
    })),
    
    // Register actions
    on(authActions.register, (state) => ({
      ...state,
      isLoading: true,
      error: null
    })),

    on(authActions.registerSuccess, (state, { user, registrationStatus }) => ({
      ...state,
      user,
      registrationStatus,
      isAuthenticated: true,
      isLoading: false,
      error: null
    })),
    on(authActions.registerFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error
    })),
    
    // Logout action
    on(authActions.logout, () => ({
      ...initialState
    })),
    
    // Check auth actions
    on(authActions.checkAuth, (state) => ({
      ...state,
      isLoading: true
    })),
    on(authActions.checkAuthSuccess, (state, { user }) => ({
      ...state,
      user,
      isAuthenticated: true,
      isLoading: false
    })),
    on(authActions.checkAuthFailure, (state) => ({
      ...state,
      user: null,
      isAuthenticated: false,
      isLoading: false
    }))
  )
});
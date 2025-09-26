import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import { LoginCredentials, RegisterCredentials } from '../services/auth.service';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    // Login actions
    'Login': props<LoginCredentials>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    
    // Register actions
    'Register': props<RegisterCredentials>(),
    'Register Success': props<{ user: User; registrationStatus: number }>(), 
    'Register Failure': props<{ error: string }>(),
    
    // Logout action
    'Logout': emptyProps(),
    
    // Check authentication status
    'Check Auth': emptyProps(),
    'Check Auth Success': props<{ user: User }>(),
    'Check Auth Failure': emptyProps()
  }
});
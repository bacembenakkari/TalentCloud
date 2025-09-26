import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { authActions } from './auth.actions';
import { switchMap } from 'rxjs/operators';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
  login$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.login),
    exhaustMap(credentials =>
      this.authService.login(credentials).pipe(
        // Use switchMap to get the user after successful login
        switchMap(token => {
          // Fetch user data from local storage (set by setSession)
          return this.authService.getUser().pipe(
            map(user => {
              if (user) {
                return authActions.loginSuccess({ user });
              } else {
                return authActions.loginFailure({ 
                  error: 'Failed to retrieve user data after login' 
                });
              }
            })
          );
        }),
        catchError(error => of(authActions.loginFailure({ error })))
      )
    )
  ));


  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.loginSuccess),
    tap(() => this.router.navigate(['/profile']))
  ), { dispatch: false });


  
  register$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.register),
    tap(credentials => console.log('Effet NGRX: Action register interceptée avec:', credentials)),
    exhaustMap(credentials =>
      this.authService.register(credentials).pipe(
        tap(response => console.log('Réponse du service d\'auth:', response)),
        map(user => authActions.registerSuccess({ user,registrationStatus:200 })),
        catchError(error => {
          console.error('Erreur d\'inscription:', error);
          return of(authActions.registerFailure({
            error: error?.error?.message || error.message || 'Registration failed'
          }));
        })
      )
    )
  ));

  registerSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.registerSuccess),
    tap(() => this.router.navigate(['/login']))
  ), { dispatch: false });

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.logout),
    tap(() => {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    })
  ), { dispatch: false });

  checkAuth$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.checkAuth),
    exhaustMap(() => {
      if (this.authService.isLoggedIn()) {
        return this.authService.getUser().pipe(
          map(user => {
            if (user) {
              return authActions.checkAuthSuccess({ user });
            }
            return authActions.checkAuthFailure();
          }),
          catchError(() => of(authActions.checkAuthFailure()))
        );
      }
      return of(authActions.checkAuthFailure());
    })
  ));
}
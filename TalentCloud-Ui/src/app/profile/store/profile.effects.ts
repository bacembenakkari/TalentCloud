import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { profileActions } from './profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private router: Router
  ) {}

  loadProfile$ = createEffect(() => this.actions$.pipe(
    ofType(profileActions.loadProfile),
    exhaustMap(() => 
      this.profileService.getUserProfile().pipe(
        map(profile => profileActions.loadProfileSuccess({ profile })),
        catchError(error => of(profileActions.loadProfileFailure({ error })))
      )
    )
  ));

  updateProfile$ = createEffect(() => this.actions$.pipe(
    ofType(profileActions.updateProfile),
    exhaustMap(({ profile }) => 
      this.profileService.updateUserProfile(profile).pipe(
        map(updatedProfile => profileActions.updateProfileSuccess({ profile: updatedProfile })),
        catchError(error => of(profileActions.updateProfileFailure({ error })))
      )
    )
  ));

  updateProfileSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(profileActions.updateProfileSuccess),
    tap(() => this.router.navigate(['/profile']))
  ), { dispatch: false });
}
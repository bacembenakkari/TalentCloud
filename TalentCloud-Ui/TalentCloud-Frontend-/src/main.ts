import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideEffects } from '@ngrx/effects'; // Ajoutez cet import

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { authFeature } from './app/auth/store/auth.reducer';
import { profileFeature } from './app/profile/store/profile.reducer';
import { AuthEffects } from './app/auth/store/auth.effects'; // Importez vos effets

const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withRouterConfig({ paramsInheritanceStrategy: 'always' })
    ),
    provideHttpClient(),
    provideStore(),
    provideState(authFeature),
    provideState(profileFeature),
    provideEffects([AuthEffects]), // Ajoutez cette ligne pour fournir les effets
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    }),
    provideAnimations()
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
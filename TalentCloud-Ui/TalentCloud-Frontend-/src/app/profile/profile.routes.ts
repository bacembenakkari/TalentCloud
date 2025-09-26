import { Route } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

export const profileRoutes: Route[] = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'edit',
    component: EditProfileComponent
  },
  {
    path: 'creat', 
    component: EditProfileComponent
  }
];
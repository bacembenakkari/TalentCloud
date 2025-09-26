// src/app/profile/components/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SidebarPanelComponent } from '../sidebar-panel/sidebar-panel.component';
import { ProfileCoverComponent } from '../profile-cover/profile-cover.component';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { AboutDetailsComponent } from '../about-details/about-details.component';
import { EducationDetailsComponent } from '../education-details/education-details.component';
import { ProfessionalExperienceComponent } from '../professional-experience/professional-experience.component';
import { AdditionalInfoComponent } from '../additional-info/additional-info.component';
import { UserProfile } from '../../../shared/models/user.model';
import { selectUserProfile, selectProfileLoading, selectProfileError } from '../../store/profile.selectors';
import { profileActions } from '../../store/profile.actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    SidebarPanelComponent,
    ProfileCoverComponent,
    ProfileMenuComponent,
    AboutDetailsComponent,
    EducationDetailsComponent,
    ProfessionalExperienceComponent,
    AdditionalInfoComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile$: Observable<UserProfile | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  
  constructor(private store: Store) {
    this.profile$ = this.store.select(selectUserProfile);
    this.isLoading$ = this.store.select(selectProfileLoading);
    this.error$ = this.store.select(selectProfileError);
  }
  
  ngOnInit() {
    // Dispatch action to load profile
    this.store.dispatch(profileActions.loadProfile());
  }
}
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { FormsModule } from '@angular/forms';
// import { ProfileData } from '../../../shared/models/profile.model';
// import { selectUserProfile, selectProfileLoading, selectProfileError } from '../../store/profile.selectors';
// import { profileActions } from '../../store/profile.actions';

// @Component({
//   selector: 'app-about-details',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './about-details.component.html',
//   styleUrls: ['./about-details.component.css']
// })
// export class AboutDetailsComponent implements OnInit {
//   // profile$: Observable<ProfileData | null>;
//   // isLoading$: Observable<boolean>;
//   // error$: Observable<string | null>;
  
//   // editMode = false;
  
//   // constructor(private store: Store) {
//   //   this.profile$ = this.store.select(selectUserProfile);
//   //   this.isLoading$ = this.store.select(selectProfileLoading);
//   //   this.error$ = this.store.select(selectProfileError);
//   // }
  
//   // ngOnInit() {
//   //   // Dispatch action to load profile data
//   //   this.store.dispatch(profileActions.loadProfile());
//   // }
  
//   // toggleEditMode(): void {
//   //   this.editMode = !this.editMode;
//   // }
  
//   // saveProfile(profile: ProfileData): void {
//   //   this.store.dispatch(profileActions.updateProfile({ profile }));
//   //   this.editMode = false;
//   // }


  
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-about-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-details.component.html',
  styleUrls: ['./about-details.component.css']
})
export class AboutDetailsComponent implements OnInit {
  // Define profileData property to match the template
  profileData: any = {
    name: '',
    email: '',
    about: '',
    dateOfBirth: '',
    phone: '',
    gender: '',
    linkedinUrl: '',
    location: '',
    portfolioUrl: '',
    stats: {
      following: 0,
      likes: 0,
      followers: 0
    }
  };
  
  constructor(private profileService: ProfileService) {}
  
  ngOnInit() {
    // Subscribe to the profileData$ observable from the service
    this.profileService.profileData$.subscribe(data => {
      if (data && Object.keys(data).length > 0) {
        this.profileData = data;
      }
    });
  }
}
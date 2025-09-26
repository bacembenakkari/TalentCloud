import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-cover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-cover.component.html',
  styleUrls: ['./profile-cover.component.css']
})
export class ProfileCoverComponent implements OnInit, AfterViewInit {
  profileData: any = {
    name: '',
    email: '',
    stats: {
      following: 0,
      likes: 0,
      followers: 0
    }
  };
  
  constructor(
    private profileService: ProfileService,
    private elementRef: ElementRef
  ) {}
  
  ngOnInit() {
    this.profileService.profileData$.subscribe(data => {
      if (data && Object.keys(data).length > 0) {
        this.profileData = data;
        this.updateCounters();
      }
    });
  }
  
  ngAfterViewInit() {
    this.updateCounters();
  }
  
  private updateCounters() {
    const followingElements = this.elementRef.nativeElement.querySelectorAll('.counter-value:nth-child(1)');
    const likesElements = this.elementRef.nativeElement.querySelectorAll('.counter-value:nth-child(2)');
    const followersElements = this.elementRef.nativeElement.querySelectorAll('.counter-value:nth-child(3)');
    
    followingElements.forEach((el: HTMLElement) => {
      el.setAttribute('data-count', String(this.profileData?.stats?.following || 0));
    });
    
    likesElements.forEach((el: HTMLElement) => {
      el.setAttribute('data-count', String(this.profileData?.stats?.likes || 0));
    });
    
    followersElements.forEach((el: HTMLElement) => {
      el.setAttribute('data-count', String(this.profileData?.stats?.followers || 0));
    });
  }
}
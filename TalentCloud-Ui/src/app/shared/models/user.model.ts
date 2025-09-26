export interface User {
  id: string;
  email: string;
  username: string;
  firstName:string;
  lastName:string;
  role:string;
  createdAt: string;
}
export interface token {
  token:token
}// src/app/models/user.model.ts
import { ProfileData, EducationItem, ExperienceItem, AdditionalInfoItem } from './profile.model';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  phoneNumber: string;
  location: string;
  website: string;
  interests: string[];
  profileData: ProfileData;
  education: EducationItem[];
  experience: ExperienceItem[];
  additionalInfo: AdditionalInfoItem[];
}
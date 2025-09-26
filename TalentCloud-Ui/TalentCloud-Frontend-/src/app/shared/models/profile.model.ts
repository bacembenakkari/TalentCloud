// src/app/models/profile.model.ts
export interface ProfileData {
  name: string;
  email: string;
  about: string;
  dateOfBirth: string;
  phone: string;
  gender: string;
  linkedinUrl: string;
  location: string;
  portfolioUrl: string;
  stats: {
    following: number;
    likes: number;
    followers: number;
  };
}

export interface EducationItem {
  key: string;
  label: string;
  value: string;
}

export interface ExperienceItem {
  key: string;
  label: string;
  value: string;
}

export interface AdditionalInfoItem {
  key: string;
  label: string;
  value: string;
}
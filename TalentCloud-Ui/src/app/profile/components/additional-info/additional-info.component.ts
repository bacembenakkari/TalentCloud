import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { AdditionalInfoItem } from '../../../shared/models/profile.model';

@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit {
  additionalInfoFields: AdditionalInfoItem[] = [];
  editingField: string | null = null;
  
  constructor(private profileService: ProfileService) {}
  
  ngOnInit() {
    this.profileService.additionalInfoFields$.subscribe(data => {
      this.additionalInfoFields = data;
    });
  }
  
  editField(key: string): void {
    this.editingField = key;
  }
  
  saveField(): void {
    if (this.editingField) {
      const field = this.additionalInfoFields.find(f => f.key === this.editingField);
      if (field) {
        this.profileService.updateAdditionalInfoField(field.key, field.value);
      }
      this.editingField = null;
    }
  }
}
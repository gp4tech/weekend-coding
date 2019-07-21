import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabRoutingModule } from './lab-routing.module';
import { LabComponent } from './lab.component';
import { PostulantsService } from '../shared/services/postulants.service';

@NgModule({
  declarations: [LabComponent],
  imports: [CommonModule, LabRoutingModule],
  providers: [PostulantsService]
})
export class LabModule {}

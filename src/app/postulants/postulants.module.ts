import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QRCodeModule } from 'angularx-qrcode';

import { PostulantsRoutingModule } from './postulants-routing.module';
import { PostulantsService } from './postulants.service';
import { PostulantsComponent } from './postulants.component';
import { PostulantComponent } from './postulant/postulant.component';

@NgModule({
  declarations: [PostulantsComponent, PostulantComponent],
  imports: [CommonModule, RouterModule, QRCodeModule, PostulantsRoutingModule],
  providers: [PostulantsService]
})
export class PostulantsModule {}

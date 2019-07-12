import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QRCodeModule } from 'angularx-qrcode';

import { PostulantsRoutingModule } from './postulants-routing.module';
import { PostulantsService } from './postulants.service';
import { PostulantsComponent } from './postulants.component';
import { PostulantComponent } from './postulant/postulant.component';
import { PostulantCredentialComponent } from './postulant-credential/postulant-credential.component';
import { ModalModule } from '../shared/directives/modal/modal.module';

@NgModule({
  declarations: [
    PostulantsComponent,
    PostulantComponent,
    PostulantCredentialComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    QRCodeModule,
    PostulantsRoutingModule,
    ModalModule
  ],
  providers: [PostulantsService]
})
export class PostulantsModule {}

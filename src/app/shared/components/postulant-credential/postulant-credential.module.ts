import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QRCodeModule } from 'angularx-qrcode';

import { PostulantCredentialComponent } from './postulant-credential.component';

@NgModule({
  declarations: [PostulantCredentialComponent],
  imports: [CommonModule, QRCodeModule],
  exports: [PostulantCredentialComponent]
})
export class PostulantCredentialModule {}

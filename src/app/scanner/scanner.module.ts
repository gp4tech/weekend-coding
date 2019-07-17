import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { ScannerRoutingModule } from './scanner-routing.module';
import { ScannerComponent } from './scanner.component';
import { PostulantsService } from '../shared/services/postulants.service';
import { ModalModule } from '../shared/directives/modal/modal.module';

@NgModule({
  declarations: [ScannerComponent],
  imports: [
    CommonModule,
    ZXingScannerModule,
    ScannerRoutingModule,
    ModalModule
  ],
  providers: [PostulantsService]
})
export class ScannerModule {}

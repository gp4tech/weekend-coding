import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { ZXingScannerModule } from '@zxing/ngx-scanner';
// import { RatingModule } from 'ng-starrating';

import { ScannerRoutingModule } from './scanner-routing.module';
import { ScannerComponent } from './scanner.component';
import { PostulantsService } from '../shared/services/postulants.service';
import { ModalModule } from '../shared/directives/modal/modal.module';
import { SelectModule } from '../shared/directives/select/select.module';

@NgModule({
  declarations: [ScannerComponent],
  imports: [
    CommonModule,
    FormsModule,
    // ZXingScannerModule,
    // RatingModule,
    ScannerRoutingModule,
    ModalModule,
    SelectModule,
  ],
  providers: [PostulantsService],
})
export class ScannerModule {}

import { Component, OnDestroy, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { PostulantsService } from '../shared/services/postulants.service';
import { Postulant } from '../shared/models/postulant.model';
import { ModalDirective } from '../shared/directives/modal/modal.directive';

@Component({
  selector: 'wc-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnDestroy {
  scannerEnabled = true;
  postulant: Postulant;
  postulantSubscription: Subscription;
  @ViewChild('postulantProcessedModal', { static: true })
  postulantModal: ModalDirective;

  constructor(private postulantsService: PostulantsService) {}

  ngOnDestroy(): void {
    if (this.postulantSubscription) {
      this.postulantSubscription.unsubscribe();
    }
  }

  processQRCode(postulantId: string): void {
    this.scannerEnabled = false;
    this.postulantSubscription = this.postulantsService
      .getById(postulantId)
      .subscribe(postulant => {
        this.postulant = postulant;
        this.postulantModal.modalInstance.open();
      });
  }

  enableScanner(): void {
    this.scannerEnabled = true;
  }
}

import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { PostulantsService } from '../shared/services/postulants.service';
import { Postulant } from '../shared/models/postulant.model';
import { ModalDirective } from '../shared/directives/modal/modal.directive';

@Component({
  selector: 'wc-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit, OnDestroy {
  selectedItemForScan: string;
  postulantId: string;
  postulant: Postulant;
  postulantSubscription: Subscription;
  @ViewChild('postulantProcessedModal', { static: true })
  postulantModal: ModalDirective;

  constructor(private postulantsService: PostulantsService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.postulantSubscription) {
      this.postulantSubscription.unsubscribe();
    }
  }

  processQRCode(postulantId: string): void {
    if (!this.postulantId) {
      this.postulantId = postulantId;
      this.postulantSubscription = this.postulantsService
        .getById(postulantId)
        .pipe(first())
        .subscribe(postulant => {
          if (postulant) {
            this.postulant = postulant;
            this.processScanSelection();
          }
        });
    }
  }

  cleanData(): void {
    this.postulantId = '';
    this.postulant = null;
    this.postulantSubscription.unsubscribe();
  }

  private processScanSelection(): void {
    if (this.selectedItemForScan) {
      const postulantFieldValueForSelection = this.postulant[
        this.selectedItemForScan
      ];

      if (this.selectedItemForScan !== 'teachersWhoGavePoints') {
        if (!postulantFieldValueForSelection) {
          this.postulant[this.selectedItemForScan] = true;
          console.log(this.postulant);
          this.postulantsService.upsertData(this.postulant);
        } else {
          console.log('Assistant was already checked');
        }
      } else {
        console.log('Giving points');
      }
    } else {
      console.log('Select an option');
    }

    this.postulantModal.modalInstance.open();
  }
}

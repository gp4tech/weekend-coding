import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';

import { Subscription, Observable, timer } from 'rxjs';
import { first } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { AuthUser } from '../shared/models/auth-user.model';
import { PostulantsService } from '../shared/services/postulants.service';
import { Postulant } from '../shared/models/postulant.model';
import { ModalDirective } from '../shared/directives/modal/modal.directive';

const defaultRate = 3;

@Component({
  selector: 'wc-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit, OnDestroy {
  images = {
    info: 'assets/images/processed.png',
    error: 'assets/images/error.png',
  };
  modalImage = this.images.error;
  postulantPoints = defaultRate;
  currentUser$: Observable<AuthUser>;
  modalMessage: string;
  selectedItemForScan: string;
  postulantId: string;
  postulant: Postulant;
  postulantSubscription: Subscription;

  @ViewChild('postulantProcessedModal', { static: true })
  postulantModal: ModalDirective;

  constructor(
    private auth: AuthService,
    private postulantsService: PostulantsService,
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.auth.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.postulantSubscription?.unsubscribe();
  }

  processQRCode(postulantId: string, currentUser: AuthUser): void {
    if (!this.postulantId && postulantId) {
      this.postulantId = encodeURIComponent(postulantId);
      this.postulantSubscription = this.postulantsService
        .getById(postulantId)
        .pipe(first())
        .subscribe((postulant) => {
          if (postulant) {
            this.postulant = postulant;
            this.processScanSelection(currentUser);
          } else {
            this.modalMessage = 'This does not look like a valid credential';
            this.modalImage = this.images.error;
          }

          timer(100).subscribe(() => this.postulantModal.modalInstance.open());
        });
    }
  }

  setPostulantRate({ rating }: { rating: number }): void {
    this.postulantPoints = rating;
  }

  cleanData(): void {
    this.postulantId = '';
    this.postulant = null;
    this.postulantSubscription.unsubscribe();
  }

  private processScanSelection(currentUser: AuthUser): void {
    const postulantFieldValueForSelection =
      this.postulant[this.selectedItemForScan];

    if (
      this.selectedItemForScan === 'teachersWhoGavePoints' ||
      !postulantFieldValueForSelection
    ) {
      this.processScanAccordingToField(currentUser);
    } else {
      this.modalMessage = 'Assistant was already checked';
      this.modalImage = this.images.error;
    }
  }

  private processScanAccordingToField(currentUser: AuthUser): boolean {
    let scanCorrectly = false;

    switch (this.selectedItemForScan) {
      case 'checkIn':
        scanCorrectly = this.postulantsService.checkInAssistant(
          currentUser,
          this.postulant,
        );
        this.modalMessage = scanCorrectly
          ? 'Check in was correct'
          : 'Check in could not be completed. Review if the assistant was validated';
        break;
      case 'feeForLunchReceived':
        scanCorrectly = this.postulantsService.markFeeForLunchAsReceived(
          currentUser,
          this.postulant,
        );
        this.modalMessage = scanCorrectly
          ? 'Fee for lunch was received correctly'
          : 'Fee for lunch could not be processed. Review if the assistant made the check in';
        break;
      case 'lunchDelivered':
        scanCorrectly = this.postulantsService.markLunchAsDelivered(
          currentUser,
          this.postulant,
        );
        this.modalMessage = scanCorrectly
          ? 'Lunch was delivered correctly'
          : 'Lunch could not be processed. Review if the assistant gave her/his fee';
        break;
      case 'firstSnackDelivered':
        scanCorrectly = this.postulantsService.markFirstSnackAsDelivered(
          currentUser,
          this.postulant,
        );
        this.modalMessage = scanCorrectly
          ? 'First snack was delivered correctly'
          : 'First snack could not be processd. Review if the assistant made the check in';
        break;
      case 'secondSnackDelivered':
        scanCorrectly = this.postulantsService.markSecondSnackAsDelivered(
          currentUser,
          this.postulant,
        );
        this.modalMessage = scanCorrectly
          ? 'Second snack was delivered correctly'
          : 'Second snack could not be processd. Review if the assistant made the check in';
        break;
      case 'teachersWhoGavePoints':
        scanCorrectly = this.postulantsService.givePointsToPostulant(
          currentUser,
          this.postulant,
          this.postulantPoints,
        );
        this.modalMessage = scanCorrectly
          ? `${this.postulantPoints} ${
              this.postulantPoints === 1 ? 'point was' : 'points were'
            } given to ${this.postulant.fullName}`
          : 'Something went wrong. It looks like you are not a speaker';
        break;
      default:
        this.modalMessage = 'Looks like you did not choose an option';
        break;
    }

    this.modalImage = scanCorrectly ? this.images.info : this.images.error;

    return scanCorrectly;
  }
}

import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';

import { PostulantsService } from '../shared/services/postulants.service';
import { Postulant } from '../shared/models/postulant.model';
import { PostulantCredentialComponent } from '../shared/components/postulant-credential/postulant-credential.component';

const firstLineTop = 20;
const secondLineTop = 525;
const firstItemLeft = 6;
const secondItemLeft = 311;
const JPEG = 'JPEG';

@Component({
  selector: 'wc-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {
  assistants$: Observable<Postulant[]>;
  @ViewChildren('credentials')
  credentials: QueryList<PostulantCredentialComponent>;

  constructor(private postulantsService: PostulantsService) {}

  ngOnInit(): void {
    this.assistants$ = this.postulantsService.getAcceptedPostulants();
  }

  printCredentials(): void {
    const pdf = new jsPDF('p', 'pt', 'legal');
    let counter = 0;

    this.credentials.forEach(credential => {
      counter++;

      const credentialData = credential.credentialCanvas.nativeElement.toDataURL(
        'image/jpeg',
        1.0
      );

      switch (counter) {
        case 1:
          pdf.addImage(credentialData, JPEG, firstItemLeft, firstLineTop);
          break;
        case 2:
          pdf.addImage(credentialData, JPEG, secondItemLeft, firstLineTop);
          break;
        case 3:
          pdf.addImage(credentialData, JPEG, firstItemLeft, secondLineTop);
          break;
        case 4:
          pdf.addImage(credentialData, JPEG, secondItemLeft, secondLineTop);
          pdf.addPage();
          counter = 0;
          break;
      }
    });

    pdf.save('wc-credentials.pdf');
  }
}

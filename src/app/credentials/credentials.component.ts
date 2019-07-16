import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';

import { PostulantsService } from '../shared/services/postulants.service';
import { Postulant } from '../shared/models/postulant.model';
import { PostulantCredentialComponent } from '../shared/components/postulant-credential/postulant-credential.component';

@Component({
  selector: 'wc-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {
  assistants$: Observable<Postulant[]>;
  @ViewChildren('credential')
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
          pdf.addImage(credentialData, 'JPEG', 6, 20);
          break;
        case 2:
          pdf.addImage(credentialData, 'JPEG', 311, 20);
          break;
        case 3:
          pdf.addImage(credentialData, 'JPEG', 6, 525);
          break;
        case 4:
          pdf.addImage(credentialData, 'JPEG', 311, 525);
          pdf.addPage();
          counter = 0;
          break;
      }
    });

    pdf.save('test.pdf');
  }
}

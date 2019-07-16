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
    const firstCredential: PostulantCredentialComponent = this.credentials
      .first;
    const lastCredential: PostulantCredentialComponent = this.credentials.last;
    const firstCredentialData = firstCredential.credentialCanvas.nativeElement.toDataURL(
      'image/jpeg',
      1.0
    );
    const lastCredentialData = lastCredential.credentialCanvas.nativeElement.toDataURL(
      'image/jpeg',
      1.0
    );

    const pdf = new jsPDF('p', 'pt', 'legal');
    pdf.addImage(firstCredentialData, 'JPEG', 6, 20);
    pdf.addImage(lastCredentialData, 'JPEG', 311, 20);
    pdf.addImage(firstCredentialData, 'JPEG', 6, 525);
    pdf.addImage(lastCredentialData, 'JPEG', 311, 525);

    pdf.addPage();

    pdf.addImage(firstCredentialData, 'JPEG', 6, 20);
    pdf.addImage(lastCredentialData, 'JPEG', 311, 20);
    pdf.addImage(firstCredentialData, 'JPEG', 6, 525);
    pdf.addImage(lastCredentialData, 'JPEG', 311, 525);
    pdf.save('test.pdf');
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
  @ViewChild('credentialsParent', { static: true })
  credentialsParent: ElementRef;

  constructor(private postulantsService: PostulantsService) {}

  ngOnInit(): void {
    this.assistants$ = this.postulantsService.getAcceptedPostulants();
  }

  printCredentials(): void {
    const credentials = this.credentialsParent.nativeElement.children;

    for (let i = 0; i < credentials.length; i++) {
      const current = credentials.item(i) as PostulantCredentialComponent;
      // console.log(current);
      // console.log(current.credentialCanvas);
      // console.log(current.canvasWidth);
    }

    const pdf = new jsPDF();
    pdf.text('Hello world!', 10, 10);
    pdf.save('a4.pdf');
  }
}

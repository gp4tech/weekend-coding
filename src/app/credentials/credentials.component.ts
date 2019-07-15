import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';

import { PostulantsService } from '../shared/services/postulants.service';
import { Postulant } from '../shared/models/postulant.model';

@Component({
  selector: 'wc-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {
  assistants$: Observable<Postulant[]>;

  constructor(private postulantsService: PostulantsService) {}

  ngOnInit(): void {
    this.assistants$ = this.postulantsService.getAcceptedPostulants();
  }

  printCredentials(): void {
    const pdf = new jsPDF();
    pdf.text('Hello world!', 10, 10);
    pdf.save('a4.pdf');
  }
}

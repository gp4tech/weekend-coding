import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { PostulantsService } from '../shared/services/postulants.service';
import { Postulant } from '../shared/models/postulant.model';
import { DataOrder } from '../shared/models/data-order.enum';

@Component({
  selector: 'wc-postulants',
  templateUrl: './postulants.component.html',
  styleUrls: ['./postulants.component.scss']
})
export class PostulantsComponent implements OnInit {
  postulants$: Observable<Postulant[]>;
  selectedPostulant: Postulant;

  constructor(public postulantsService: PostulantsService) {}

  ngOnInit(): void {
    this.postulants$ = this.postulantsService.getAllSorted(
      'fullName',
      DataOrder.asc
    );
  }

  setSelectedPostulant(postulant: Postulant): void {
    this.selectedPostulant = postulant;
  }
}

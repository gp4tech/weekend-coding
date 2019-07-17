import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { PostulantsService } from '../shared/services/postulants.service';
import { Postulant } from '../shared/models/postulant.model';
import { DataOrder } from '../shared/models/data-order.enum';

@Component({
  selector: 'wc-postulants',
  templateUrl: './postulants.component.html',
  styleUrls: ['./postulants.component.scss']
})
export class PostulantsComponent implements OnInit, OnDestroy {
  searchTerm = '';
  postulants: Postulant[];
  postulantsSubscription: Subscription;
  selectedPostulant: Postulant;

  constructor(public postulantsService: PostulantsService) {}

  ngOnInit(): void {
    this.postulantsSubscription = this.postulantsService
      .getAllSorted('fullName', DataOrder.asc)
      .subscribe(postulants => {
        this.postulants = postulants;
        this.searchPostulant();
      });
  }

  ngOnDestroy(): void {
    this.postulantsSubscription.unsubscribe();
  }

  setSelectedPostulant(postulant: Postulant): void {
    this.selectedPostulant = postulant;
  }

  searchPostulant(): void {
    if (this.searchTerm) {
      this.postulants.forEach(postulant => {
        postulant.visibleInSearch = postulant.fullName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
    } else {
      this.postulants.forEach(postulant => {
        postulant.visibleInSearch = true;
      });
    }
  }
}

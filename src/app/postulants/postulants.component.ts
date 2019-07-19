import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { AuthUser } from '../shared/models/auth-user.model';
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
  currentUser: Observable<AuthUser>;
  postulants: Postulant[];
  postulantsSubscription: Subscription;
  selectedPostulant: Postulant;

  constructor(
    public postulantsService: PostulantsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { PostulantsService } from '../postulants.service';
import { PostulantCredentialComponent } from '../postulant-credential/postulant-credential.component';
import { Postulant } from '../../shared/models/postulant.model';

@Component({
  selector: 'wc-postulant',
  templateUrl: './postulant.component.html',
  styleUrls: ['./postulant.component.scss']
})
export class PostulantComponent implements OnInit, OnDestroy {
  postulantId: string;
  postulant: Postulant;
  postulantSubscription: Subscription;
  credential: PostulantCredentialComponent;

  constructor(
    public postulantService: PostulantsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postulantId = this.route.snapshot.paramMap.get('id');

    this.postulantSubscription = this.postulantService
      .getById(this.postulantId)
      .subscribe(postulant => {
        if (postulant) {
          this.postulant = postulant;
        } else {
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    this.postulantSubscription.unsubscribe();
  }

  setPostulantCredential(credential: PostulantCredentialComponent): void {
    this.credential = credential;
  }

  printCredential(): void {
    if (this.credential) {
      this.credential.print();
    }
  }
}

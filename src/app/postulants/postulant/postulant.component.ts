import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, Observable } from 'rxjs';

import { AuthUser } from '../../shared/models/auth-user.model';
import { AuthService } from '../../auth/auth.service';
import { PostulantCredentialComponent } from '../../shared/components/postulant-credential/postulant-credential.component';
import { PostulantsService } from '../../shared/services/postulants.service';
import { Postulant } from '../../shared/models/postulant.model';

@Component({
  selector: 'wc-postulant',
  templateUrl: './postulant.component.html',
  styleUrls: ['./postulant.component.scss'],
})
export class PostulantComponent implements OnInit, OnDestroy {
  currentUser$: Observable<AuthUser>;
  postulantId: string;
  postulant: Postulant;
  postulantSubscription: Subscription;
  credential: PostulantCredentialComponent;

  constructor(
    public postulantsService: PostulantsService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.auth.getCurrentUser();
    this.postulantId = this.route.snapshot.paramMap.get('id');

    // this.postulantSubscription = this.postulantsService
    //   .getById(this.postulantId)
    //   .subscribe((postulant) => {
    //     if (postulant) {
    //       this.postulant = postulant;
    //     } else {
    //       this.router.navigate(['/']);
    //     }
    //   });
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { PostulantsService } from '../postulants.service';
import { Postulant } from '../../shared/models/postulant.model';

@Component({
  selector: 'wc-postulant',
  templateUrl: './postulant.component.html',
  styleUrls: ['./postulant.component.scss']
})
export class PostulantComponent implements OnInit {
  postulant: Postulant;
  postulantId: string;
  postulantSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postulantService: PostulantsService
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

  acceptPostulant(postulant: Postulant): void {
    postulant.accepted = !postulant.accepted;
    this.postulantService.upsertData(postulant);
  }
}

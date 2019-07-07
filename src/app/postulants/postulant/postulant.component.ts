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
  postulantId: string;
  postulant: Postulant;
  postulantSubscription: Subscription;
  qrData = 'QR was not generated yet';

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
          this.qrData = JSON.stringify(postulant);
          console.log(this.postulant);
        } else {
          this.router.navigate(['/']);
        }
      });
  }
}

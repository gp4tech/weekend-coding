import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Postulant } from '../shared/models/postulant.model';
import { PostulantsService } from '../shared/services/postulants.service';

@Component({
  selector: 'wc-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {
  assistants$: Observable<Postulant[]>;

  constructor(private postulantsService: PostulantsService) {}

  ngOnInit(): void {
    this.assistants$ = this.postulantsService.getLabPostulants();
  }
}

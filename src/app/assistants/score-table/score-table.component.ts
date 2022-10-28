import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { PostulantsService } from '../../shared/services/postulants.service';
import { Postulant } from '../../shared/models/postulant.model';
import { DataOrder } from '../../shared/models/data-order.enum';

@Component({
  selector: 'wc-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.scss']
})
export class ScoreTableComponent implements OnInit {
  assistants$: Observable<Postulant[]>;

  constructor(private postulantsService: PostulantsService) {}

  ngOnInit(): void {
    this.assistants$ = this.postulantsService.getAllSorted(
      'accumulatedPoints',
      DataOrder.desc
    );
  }
}

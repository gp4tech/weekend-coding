import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Postulant } from '../shared/models/postulant.model';
import { PostulantsService } from '../shared/services/postulants.service';

@Component({
  selector: 'wc-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['./assistants.component.scss']
})
export class AssistantsComponent implements OnInit, OnDestroy {
  searchTerm = '';
  assistants: Postulant[];
  assistantsSubscription: Subscription;

  constructor(public postunlantsService: PostulantsService) {}

  ngOnInit(): void {
    this.assistantsSubscription = this.postunlantsService
      .getAcceptedPostulants()
      .subscribe(assistants => {
        this.assistants = assistants;
        this.makeAllAssistantsVisibleInSearch();
      });
  }

  ngOnDestroy(): void {
    this.assistantsSubscription.unsubscribe();
  }

  searchAssistant(): void {
    if (this.searchTerm) {
      this.assistants.forEach(assistant => {
        assistant.visibleInSearch = assistant.fullName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
    } else {
      this.makeAllAssistantsVisibleInSearch();
    }
  }

  private makeAllAssistantsVisibleInSearch(): void {
    this.assistants.forEach(assistant => {
      assistant.visibleInSearch = true;
    });
  }
}

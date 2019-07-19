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
  rfidInputEnabled = false;
  currentAssistant: Postulant;
  assistants: Postulant[];
  assistantsSubscription: Subscription;

  constructor(public postunlantsService: PostulantsService) {}

  ngOnInit(): void {
    this.assistantsSubscription = this.postunlantsService
      .getConfirmedPostulants()
      .subscribe(assistants => {
        this.assistants = assistants;
        this.searchAssistant();
        this.currentAssistant = this.assistants[0];
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
      this.assistants.forEach(assistant => {
        assistant.visibleInSearch = true;
      });
    }
  }

  enableEditingRFID(assistant: Postulant): void {
    this.rfidInputEnabled = true;
    this.currentAssistant = assistant;
  }

  saveAssistantRFID(assistant: Postulant): void {
    this.postunlantsService.upsertData(assistant);
    this.rfidInputEnabled = false;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AssistantsRoutingModule } from './assistants-routing.module';
import { AssistantsComponent } from './assistants.component';
import { PostulantsService } from '../shared/services/postulants.service';

@NgModule({
  declarations: [AssistantsComponent],
  imports: [CommonModule, FormsModule, AssistantsRoutingModule],
  providers: [PostulantsService]
})
export class AssistantsModule {}

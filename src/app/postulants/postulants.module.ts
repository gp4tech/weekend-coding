import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostulantsRoutingModule } from './postulants-routing.module';
import { PostulantsComponent } from './postulants.component';
import { PostulantsService } from './postulants.service';

@NgModule({
  declarations: [PostulantsComponent],
  imports: [CommonModule, PostulantsRoutingModule],
  providers: [PostulantsService]
})
export class PostulantsModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostulantsComponent } from './postulants.component';

const routes: Routes = [
  {
    path: '',
    component: PostulantsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostulantsRoutingModule {}

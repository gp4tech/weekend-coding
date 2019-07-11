import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostulantsComponent } from './postulants.component';
import { PostulantComponent } from './postulant/postulant.component';

const routes: Routes = [
  {
    path: '',
    component: PostulantsComponent
  },
  {
    path: ':id',
    component: PostulantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostulantsRoutingModule {}

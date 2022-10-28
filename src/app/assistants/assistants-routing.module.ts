import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistantsComponent } from './assistants.component';
import { ScoreTableComponent } from './score-table/score-table.component';

const routes: Routes = [
  {
    path: '',
    component: AssistantsComponent
  },
  {
    path: 'scores',
    component: ScoreTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssistantsRoutingModule {}

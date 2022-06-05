import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionComponent }  from './competition/competition.component'
import { MatchesTeamsViewComponent } from './matches-teams-view/matches-temas-view.component'

const routes: Routes = [
  {
    path:'',
    component:CompetitionComponent
  },
  {
    path:'match-view/:id',
    component:MatchesTeamsViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

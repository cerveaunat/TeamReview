import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DexComponent } from './dex/dex.component';
import { CurrentTeamComponent } from './current-team/current-team.component';
import { SavedTeamsComponent } from './saved-teams/saved-teams.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DexComponent,
    CurrentTeamComponent,
    SavedTeamsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot([
      {path : 'dex', component : DexComponent},
      {path: 'currentTeam', component : CurrentTeamComponent},
      {path: 'savedTeams', component : SavedTeamsComponent},
      {path:'', redirectTo:'/dex', pathMatch : 'full'}
    ]),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

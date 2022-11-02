import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-saved-teams',
  templateUrl: './saved-teams.component.html',
  styleUrls: ['./saved-teams.component.css']
})
export class SavedTeamsComponent implements OnInit {

  savedTeams:any[] = [];

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getSavedTeams()
    .subscribe((response:any) => {
      response.forEach((element:any) => {
        this.savedTeams.push(element);
      });
    });
  }

  delete(team:any){
    alert('The team ' + team.teamName + ' was deleted');
    this.dataService.deleteTeam(team)
    .subscribe();
    this.savedTeams = this.savedTeams.filter((item) => {
      return item !== team;
    });
  }

  deleteAllTeams(){
    alert('All teams have been deleted');
    this.dataService.deleteAllTeams()
    .subscribe();
    this.savedTeams.length = 0;
  }

}

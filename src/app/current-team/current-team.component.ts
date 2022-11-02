import { Component, createPlatform, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';       

@Component({
  selector: 'app-current-team',
  templateUrl: './current-team.component.html',
  styleUrls: ['./current-team.component.css']
})

export class CurrentTeamComponent implements OnInit {

  currentTeam:any[] = [];
  currentTeamName:string = '';
  dangerousPokemon:any[] = [];
  allTypesList=['fire','water','grass','bug','poison','flying','normal','electric','ground','fairy','fighting','psychic','rock','steel','ice','ghost','dark','dragon']

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getCurrentTeam()
      .subscribe((response:any) => {
        response.forEach((element:any) => {
          this.currentTeam.push(element);
        })
      })
      console.log(this.currentTeam);
  }

  delete(){
    alert('Team deleted');
    this.dataService.deleteCurrentTeam()
    .subscribe();
  }

  onKey(event: any) {
    this.currentTeamName = event.target.value;
 }

  save(currentTeam:any){
    if(currentTeam.length > 0){
      alert('Team saved');
      this.dataService.postCurrentTeam(this.currentTeamName,currentTeam).
      subscribe()
      window.location.reload();
    } else {
      alert('Your team needs at least 6 Pokémons !')
    }
   
  }

  

  evaluate(currentTeam:any){

    const resistedTypes:string[] = [];

    function smartPush(type:string){
      if (!resistedTypes.includes(type)){
        resistedTypes.push(type)
      }
    }

    currentTeam.forEach((element:any) => {
      if (element.type == 'normal'){
        smartPush('ghost');
      }
      if (element.type == 'grass'){
        smartPush('ground');
        smartPush('water');
        smartPush('grass');
        smartPush('electric');
      }
      if (element.type == 'fire'){
        smartPush('fire');
        smartPush('fairy');
        smartPush('grass');
        smartPush('bug');
        smartPush('steel');
        smartPush('ice');
      }
      if(element.type == 'water'){
        smartPush('water');
        smartPush('ice');
        smartPush('steel');
        smartPush('steel');
      }
      if(element.type == 'bug'){
        smartPush('fighting');
        smartPush('ground');
        smartPush('ground');
      }
      if(element.type == 'electric'){
        smartPush('electric');
        smartPush('steel');
        smartPush('flying');
      }
      if(element.type == 'ice'){
        smartPush('ice');
      }
      if(element.type == 'fighting'){
        smartPush('bug');
        smartPush('dark');
        smartPush('rock');
      }
      if(element.type == 'poison'){
        smartPush('poison');
        smartPush('fairy');
        smartPush('grass');
        smartPush('bug');
        smartPush('figthing');
      }
      if(element.type == 'ground'){
        smartPush('electric');
        smartPush('poison');
        smartPush('rock');
      }
      if(element.type == 'flying'){
        smartPush('ground');
        smartPush('bug');
        smartPush('grass');
        smartPush('fighting');
      }
      if(element.type == 'psychic'){
        smartPush('psychic');
        smartPush('fighting');
      }
      if(element.type == 'rock'){
        smartPush('normal');
        smartPush('fire');
        smartPush('poison');
        smartPush('flying');
      }
      if(element.type == 'ghost'){
        smartPush('normal');
        smartPush('fighting');
        smartPush('poison');
        smartPush('bug');
      }
      if(element.type == 'dragon'){
        smartPush('electric');
        smartPush('fire');
        smartPush('grass');
        smartPush('water');
      }
      if(element.type == 'dark'){
        smartPush('psychic');
        smartPush('ghost');
        smartPush('dark');
      }
      if(element.type == 'steel'){
        smartPush('normal');
        smartPush('poison');
        smartPush('grass');
        smartPush('fairy');
        smartPush('psychic');
        smartPush('bug');
        smartPush('flying');
        smartPush('dragon');
        smartPush('steel');
        smartPush('rock');
      }
      if(element.type == 'fairy'){
        smartPush('dragon');
        smartPush('fighting');
        smartPush('bug');
        smartPush('dark');
      }
    });

    const weakTeamTypes = this.allTypesList.filter((item) => {
      return !resistedTypes.includes(item);
    });

    if (weakTeamTypes.length == 0){
      alert('Votre équipe résiste à tous les types !');
    } else {
      this.dataService.getMons()
    .subscribe((response:any) => {
      response.results.forEach((element: any) => {
        this.dataService.getMonsInfos(element.name)
        .subscribe((response:any) => {
          if(weakTeamTypes.includes(response.types[0].type.name)){
            this.dangerousPokemon.push(response);
          }
        });
      });
    });
    }
    console.log(this.dangerousPokemon);
  }
}

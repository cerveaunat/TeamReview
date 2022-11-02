import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  clientURL = '/clientApi';

  constructor(private http:HttpClient) { }

  getMons() {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
  }

  getMonsInfos(name:string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  getCurrentTeam() {
    return this.http.get(this.clientURL + '/currentTeam');
  }

  getSavedTeams() {
    return this.http.get(this.clientURL + '/savedTeams')
  }

  postMonInTeam(mon:any){
    const monData = {
      name : mon.name,
      sprite : mon.sprites.front_default,
      type : mon.types[0].type.name
    };
    return this.http.post<any>(this.clientURL + '/currentTeam', {monData})
  }

  deleteCurrentTeam(){
    return this.http.delete(this.clientURL + '/currentTeam');
  }  

  deleteTeam(team:any){
    return this.http.post<any>(this.clientURL + '/savedTeams/deleteTeam', {team})
  }

  postCurrentTeam(name:string, team:any[]){
    const newTeam = {
      teamName : name,
      teamMons : team
    }
    return this.http.post<any>(this.clientURL + '/savedTeams', {newTeam})
  }

  deleteAllTeams(){
    return this.http.delete(this.clientURL + '/savedTeams')
  }

}

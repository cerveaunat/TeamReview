import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dex',
  templateUrl: './dex.component.html',
  styleUrls: ['./dex.component.css']
})
export class DexComponent implements OnInit {

  dex:any[] = [];

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getMons()
    .subscribe((response:any) => {
      response.results.forEach((element: any) => {
        this.dataService.getMonsInfos(element.name)
        .subscribe((response:any) => {
          this.dex.push(response);
        })
      });
    })
  }

  post(mon : any){
    alert('Pokemon successfuly added to your team');
    this.dataService.postMonInTeam(mon)
    .subscribe();
  }

}

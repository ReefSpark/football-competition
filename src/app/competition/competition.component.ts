import { Component, OnInit } from '@angular/core';
import {CrudService} from '../crud.service'
import * as _ from 'lodash'
import {MessageService} from '../message.service'
import { Router ,RouterOutlet,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  constructor(
    private crudService:CrudService,
    private messageService:MessageService,
    private router : Router
    ){}

  ngOnInit(): void {
      this.getCompetitions()
  }
  competitionList:any=[]
  listView:boolean=true
  getCompetitions(){
    this.messageService.showLoader(true)
    this.crudService.commonURL('/competition',"GET").then((response:any)=>{
      let that=this;
      this.messageService.showLoader(false)
      if(response){
        if(response.competitions){
            _.each(response.competitions,(element)=>{
              that.competitionList.push({id:element.id,name:element.name,code:element.code,image:element.emblemUrl})
            })
        }
      }

    })
  }
  getCompetitionId(event:any){
    this.listView=false
    this.router.navigateByUrl(`/match-view/${event.id}`)
  }

}

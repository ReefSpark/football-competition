import { Component, OnInit,Inject } from '@angular/core';
import { Router ,RouterOutlet,ActivatedRoute} from '@angular/router';
import {CrudService} from '../crud.service'
import * as _ from 'lodash'
import {MessageService} from '../message.service'
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-matches-view',
  templateUrl: './matches-teams-view.component.html',
  styleUrls: ['./matches-teams-view.component.css']
})
export class MatchesTeamsViewComponent implements OnInit {

  constructor(
    private crudService:CrudService,
    private messageService:MessageService,
    private router : Router,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog
    ){}
    routeParams:any;
  ngOnInit(): void {
    let params = this.activeRoute.snapshot.params;
		if (params) {
      this.routeParams=params['id']
    }
    this.getTeamsList()
  }
  teamLists:any=[]
  getTeamsList(){
    this.messageService.showLoader(true)
    this.crudService.commonURL(`/competition/teams/${this.routeParams}`,"GET").then((response:any)=>{
      let that=this;
      this.messageService.showLoader(false)
      if(response){
        if(response.teams){
            _.each(response.teams,(element)=>{
              console.log("Element:",element)
              that.teamLists.push({id:element.id,teamName:element.name,teamCode:element.tla,image:element.crestUrl})
            })
        }
      }

    })
  }

  viewTeamMembers(event:any){
    const dialogRef = this.dialog.open(TeamsView, {
      width: '800px',
      data:{team:event}
    })

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}


@Component({
  selector: '',
  templateUrl: './teamsViewModal.html',
  styleUrls: ['./matches-teams-view.component.css']
})
export class TeamsView implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TeamsView>,
    private crudService:CrudService,
    private messageService:MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){}
    tablist=[{id:'basic',value:'BASIC INFO'},{id:'player_list',value:'PLAYER DETAILS'}]
    tabIndex:any=0
    active_tab:any
  ngOnInit(): void {
    this.active_tab=this.tablist[this.tabIndex]
    this.getTeamsList()
    console.log("data:",this.data)
  }
  memberList:any=[]

  setActiveTab(index:any){
    console.log("Index:",index)
    this.active_tab=this.tablist[index]
    switch (index) {
      case 1:
        this.getTeamsList()
      break;
    }
  }
  getTeamsList(){

    this.crudService.commonURL(`/competition/team/member/${this.data.team.id}`,"GET").then((response:any)=>{
      let that=this;
      if(response){
            _.each(response,(element)=>{
              element['dateOfBirth'] = moment(element.dateOfBirth).format('MMM Do YYYY')
              that.memberList.push(element)
            })
      }

    })
  }
}

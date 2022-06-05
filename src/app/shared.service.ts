import { Component, Inject, Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  constructor(public snackBar: MatSnackBar,){

  }
  public ApiEndpoint: any = {
    serve_host_url: 'http://localhost:3000/api'
  };
  openSnackBar(message: string, duration:any,title?:any) {
    if(title){
      message=title.toString().toUpperCase()+"\n\n"+message;
    }
    this.snackBar.open(message, "Close", {
      duration: duration * 1000,
      verticalPosition: 'top'
    });
  }

}

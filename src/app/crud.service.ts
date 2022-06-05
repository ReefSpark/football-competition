import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router ,ActivatedRoute} from '@angular/router';
import {SharedService} from './shared.service'




import { MessageService } from './message.service';

/**
  *Internal method for computing and transforming HTTP CRUD data
  */

  @Injectable({
    providedIn: 'root'
  })

  export class CrudService {

    constructor(
      private http: HttpClient,
      public messageService: MessageService,
      public shared :SharedService,
      public _router:Router

      ) { }


    commonURL(url:any, method:any, params?:any) {
      return new Promise((resolve, reject) => {
        var paramsObject = undefined;
        paramsObject = params?params:'';


        this.performCRUDOperations(paramsObject, url, method).then((response: any) => {
          resolve(response);
        }, error => {
          var err = error;
          if (err) {
            var message = err.error;
            console.log("Error:",message)
            if (message.data['attributes']) {
              message = message.data['attributes'].message;
              this.shared.openSnackBar("APi Error",5)
            } else if (err.message) {
              // if (err.message.indexOf("[object") != -1) {
              //   message = this.response_messages.error.something.msg;
              // } else {
              //   message = err.message;
              // }
            }
          } else {
            resolve(false);
          }
        });
      });
    }
    performCRUDOperations(params:any, url:any, method:any) {
      return new Promise((resolve, reject) => {
        switch (method) {
          case "GET":
           this.getData(params, url).subscribe((response: any) => {
            resolve(response);
          }, error => {
            reject(error);
          })
        }
      });
    }

    getData(params:any, url:any) {
      return this.http.get(this.shared.ApiEndpoint.serve_host_url + url);
    }


}

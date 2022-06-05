import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

/**
*Event / Internal Message Listeners
*/
@Injectable({providedIn: 'root'})
export class MessageService {
  private subject = new Subject<any>();
  private progressbar = new Subject<any>();

  showLoader(op: boolean) {
    this.progressbar.next(op);
  }
}

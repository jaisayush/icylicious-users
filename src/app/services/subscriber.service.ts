import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private _http: HttpClient) { }

  _url = "https://icylicious.herokuapp.com/setemail";


  subscribe(emailData){
    return this._http.post(this._url,emailData);
  }

}

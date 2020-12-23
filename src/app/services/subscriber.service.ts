import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private _http: HttpClient) { }

  _url = "https://sumit-icylicious-sep-20.herokuapp.com/setemail";
  // _url = "http://localhost:3001/setemail";


  subscribe(emailData){
    return this._http.post(this._url,emailData);
  }

  idCheckUnique(id){
    console.log(id);
    return this._http.get(`https://sumit-icylicious-sep-20.herokuapp.com/email/id?id=${id}`)
    // return this._http.get(`http://localhost:3001/email/id?id=${id}`)
  }

}

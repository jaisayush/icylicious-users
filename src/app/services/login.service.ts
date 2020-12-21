import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _url = 'https://sumit-icylicious-sep-20.herokuapp.com/login'
  constructor(private _http: HttpClient) { }

  login(data){
    return this._http.post<{msg:String,id:String,usertoken:String}>(this._url,data)
  }

}



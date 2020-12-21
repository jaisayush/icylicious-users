import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http: HttpClient) { }

  checkMail = "https://icylicious.herokuapp.com/mail";
  registerUrl = "https://icylicious.herokuapp.com/user";

  emailCheckUnique(email){
    // console.log(this.checkMail+`?mail=${email}`)
    return this._http.get(this.checkMail+`?email=${email}`)
  }

  register(data){
    return this._http.post(this.registerUrl,data)
  }


}

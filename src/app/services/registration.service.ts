import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http: HttpClient) { }

  checkMail = "https://icylicious.herokuapp.com/mail";


  emailCheckUnique(email){
    // console.log(this.checkMail+`?mail=${email}`)
    return this._http.get(this.checkMail+`?mail=${email}`)
  }

}

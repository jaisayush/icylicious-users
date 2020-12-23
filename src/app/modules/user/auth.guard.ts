import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _loginService:LoginService, private _route: Router){}

  canActivate():boolean{
    if(this._loginService.loggedIn()){
      return true
    }
    else{
      this._route.navigate(['/'])
      return false;
    }
  }
  
}

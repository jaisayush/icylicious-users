import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Cotter from "cotter"; 
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  success = false;
  payload = null;
  email = null;
  payloadString = null;
  public emailAlredyExist:boolean = false;
  constructor(private router:Router,private _registrationService:RegistrationService) { }

  ngOnInit(): void {

    var cotter = new Cotter("282dd13a-fe0a-4c8d-891b-146dce433961");
    cotter
      .signInWithLink()
      .showEmailForm() 
      .then((payload: object) => {
        this.success = true;
        this.payload = payload;
        this.payloadString = JSON.stringify(payload, null, 4);
        console.log(this.payloadString);
        this.email =  this.payload.email;
      })
      .then(()=>{
          this._registrationService.emailCheckUnique(this.email)
          .subscribe(res => {
          console.log(res)
          if (res != null) {
            this.emailAlredyExist = true;
            console.log("email already exist");
          }
          else{
            this.emailAlredyExist = false;
            if(this.email != null){
              console.log(this.email)
            }
            this.router.navigate(['signup',{email:this.email}],{skipLocationChange:true})            
          }
    });
      })
      .catch((err: any) => console.log(err));

  }

}

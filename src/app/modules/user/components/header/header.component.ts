import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  constructor(private fb:FormBuilder,private loginService:LoginService, private route:Router) { }

  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(8)]]
  })
  ngOnInit(): void {
  }

  public failed:boolean = false;
  public wrongPass:boolean = false;

  onChange(){
    this.failed = false;
    this.wrongPass = false;
  }

  logged:boolean = !!localStorage.getItem('userLogged');

  onSubmit(){
    console.log(this.loginForm.value)
    this.loginService.login(this.loginForm.value)
      .subscribe(
        response =>{
          console.log(response)
          if(response.msg === "invalid"){
            this.loginForm.reset();
            this.failed = true;
          }
          else if(response.msg === "failed"){
            this.loginForm.patchValue({email: this.loginForm.get('email').value,password:''});
            this.wrongPass = true;
          }
          else{
            this.logged = true;
            localStorage.setItem('userLogged', "true");
            localStorage.setItem('id', response.id.toString());
            localStorage.setItem('userToken', response.usertoken.toString());
            this.loginForm.reset();
            this.route.navigate(['/']);
            this.hide();
          }
        },
        error =>{
          this.failed = true;
          console.log('error occured',error)
          this.loginForm.reset();
        }
      )
  }

  public showModal:boolean;
  
  showLogin(){
    this.showModal = true;
  }

  hide(){
    this.showModal = false;
  }

}

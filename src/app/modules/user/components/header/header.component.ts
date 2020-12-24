import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { SharedService } from 'src/app/services/shared.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public productLength:any = 8;

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  constructor(private fb:FormBuilder,private loginService:LoginService, private route:Router, private shared:SharedService, private service: CartService) { }

  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(8)]]
  })

  cart: any;
  ngOnInit(): void {
      this.service.getCartDetail(this.decryptData(localStorage.getItem('email'))).subscribe((response) => {
        if (response) {
          this.cart = response;
          if (this.cart == 'Cart is empty') {
            this.cart=null;
          } else {
            if(this.cart.products.length > 0){
              this.productLength = this.cart.products.length;
            }
            else{
              this.productLength = ''
            }
          }
        }
      });
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
            localStorage.setItem('email', this.encryptData(response.email.toString()));
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
  encryptSecretKey = "esrgr54gyse65tgzs56e4tg56s4rg";
  encryptData(data) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  decryptData(data) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  public showModal:boolean;

  
  showLogin(){
    this.showModal = true;
  }

  hide(){
    this.showModal = false;
  }


  // public logoutModal:boolean;

  // showLogout(){
  //   console.log('click')
  //   this.logoutModal = true;
  // }

  // closeModal(){
  //   this.logoutModal = false;
  // }
  showDeleteModal:boolean;
  
  showDelete(){
    this.showDeleteModal = true;
  }

  closeModal(){
    this.showDeleteModal = false;
  }

  logout(){
    localStorage.removeItem('userLogged')
    localStorage.removeItem('userToken')
    localStorage.removeItem('email')
    localStorage.removeItem('id')
    this.route.navigate(['/'])
  }


  updatePassword(){
    this.route.navigate(['update',{email:this.decryptData(localStorage.getItem('email'))}],{skipLocationChange:true})
  }
  

}

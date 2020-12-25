import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  encryptSecretKey = "esrgr54gyse65tgzs56e4tg56s4rg";
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

  constructor(private route:Router,private service:ProfileService,private router:Router) { }
  public orders:any=[];
  public orderByemail:any=[];
  public items:any=[];
  public flag=0;
  showDeleteModal:boolean
  showViewModel:boolean
  email = this.decryptData(localStorage.getItem('email'))
  
  ngOnInit(){
    console.log("email"+this.email);
    this.service.getOrders().subscribe((response)=>{
       this.orders=response;
      for(var i=0;i<this.orders.length;i++){
        if(this.orders[i].userId==this.email){
            this.orderByemail.push(this.orders[i]);
            console.log(this.orderByemail);
            this.flag=1;
        }
      }
      console.log("flag"+this.flag)
      if(this.flag==0){
        this.showViewModel=true;
        console.log("no orders are found");


      }
      // console.log("length"+this.orderByemail.itemPurchased);
    })

  }
  getDate(date:any){
    let newDate = date.substring(0,10)
    return newDate
  }
  // closeOrderModal() {
  //   // this.showViewModel = false;
  //   this.router.navigate(['shop']);
  // }
  shopNow(){
    this.router.navigate(['shop']);
  }

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

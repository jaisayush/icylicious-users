import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ViewProductService {
  

  url = 'https://sumit-icylicious-sep-20.herokuapp.com/products';
//   newurl = 'http://localhost:3001/getProducts';
newurl = 'https://sumit-icylicious-sep-20.herokuapp.com/getProducts';   

  // url='http://localhost:3000/products';
  // setCartUrl='http://localhost:3000/setcart';
  setCartUrl='https://sumit-icylicious-sep-20.herokuapp.com/setCart';


  constructor(private httpClient:HttpClient,private router:Router) { }
 
  
  getProducts(){
   const header = new HttpHeaders({
      'Authorization': localStorage.getItem('userToken') });
      if(!header){
          return this.httpClient.get(this.url, {headers: header});
        }
    else
       {
          return this.httpClient.get(this.newurl);
       }
  }
  createCart(productdata){
   const header = new HttpHeaders({
      'Authorization': localStorage.getItem('userToken') });
         return this.httpClient.post(this.setCartUrl,productdata, {headers: header});
      
  }

}

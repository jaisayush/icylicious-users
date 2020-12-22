import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ViewProductService {
  

  url = 'https://icylicious.herokuapp.com/products';
  // url='http://localhost:3000/products';
  // setCartUrl='http://localhost:3000/setcart';
  setCartUrl='https://sumit-icylicious-sep-20.herokuapp.com/setCart';


  constructor(private httpClient:HttpClient,private router:Router) { }

  getProducts(){
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('userToken') });

    return this.httpClient.get(this.url, {headers: header});
  }
  createCart(productdata){
    return this.httpClient.post(this.setCartUrl,productdata);
  }

}

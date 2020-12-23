import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  // constructor() { }

  id;
  constructor(private http:HttpClient) { }



  getCartDetail(userId){
    this.id={'userId':userId};
    console.log(this.id);
    const header = new HttpHeaders({
      "Authorization":localStorage.getItem('userToken')
    })
    return this.http.post<{msg:string}>("https://sumit-icylicious-sep-20.herokuapp.com/getcart",(this.id),{headers:header});
  }

  getImageDetail(productId){
    const header = new HttpHeaders({
      "Authorization":localStorage.getItem('userToken')
    })
    return this.http.get<{msg:string}>(`https://sumit-icylicious-sep-20.herokuapp.com/product/${productId}`,{headers:header});
  }

  updateCartDetail(cart){
    const header = new HttpHeaders({
      "Authorization":localStorage.getItem('userToken')
    })
    return this.http.post<{msg:string}>("https://sumit-icylicious-sep-20.herokuapp.com/setcart",cart, {headers:header});
  }

  deleteProduct(productDetail){
    const header = new HttpHeaders({
      "Authorization":localStorage.getItem('userToken')
    })
    return this.http.post<{msg:string}>("https://sumit-icylicious-sep-20.herokuapp.com/delitem",productDetail, {headers:header});
  }

  placeOrder(cart){
    const header = new HttpHeaders({
      "Authorization":localStorage.getItem('userToken')
    })
    return this.http.post<{msg:string}>("https://sumit-icylicious-sep-20.herokuapp.com/createOrders",cart, {headers:header});
  }

  deleteUserCart(userId){
    this.id=JSON.stringify({'userId':userId});
    const header = new HttpHeaders({
      "Authorization":localStorage.getItem('userToken')
    })
    let url = "https://sumit-icylicious-sep-20.herokuapp.com/delusercart/" + userId
    return this.http.delete<{msg:string}>(url, {headers:header});
  }

}

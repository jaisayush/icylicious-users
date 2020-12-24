import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient:HttpClient) { }
  // url="http://localhost:3000/getOrders"
  url="https://sumit-icylicious-sep-20.herokuapp.com/getOrders";
  getOrders()
  {
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('userToken') });
    // console.log("emailId"+emailId);
    return this.httpClient.get(this.url,{headers:header}); 

    // return this.httpClient.get(`http://localhost:3000/orderByemail/${emailId}`,{headers:header}); 
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CartService} from 'src/app/services/cart.service'
import { SharedService } from 'src/app/services/shared.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent  {

  cart: any;
  placeOrder:boolean=true;
  constructor(private service: CartService, private shared:SharedService, private route:Router) {

  }
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

  ngOnInit(): void {
    console.log(this.decryptData(localStorage.getItem('email')))
    this.getCart();
  }

  checkProductExpiry(product){
    let date = new Date();
    let d = date.toISOString().split('T')[0];
    if(product.productEndDate.split('T')[0]<d || product.productStartDate.split('T')[0]>d){
      return false;
    }
    else{
      return true;
    }
  }

  deleteUserCartSubscribe(userId){
    this.service.deleteUserCart(userId).subscribe((response)=>{
      if(response){
        console.log(response);
        console.log("cart is deleted");
        this.cart=null;
      }
    })
  }

  placeOrderSubscribe(orderDetail){
    this.service.placeOrder(orderDetail).subscribe((response)=>{
      if(response){
        console.log("placed");
        console.log(response);
        this.deleteUserCartSubscribe(this.decryptData(localStorage.getItem('email')));
      }
    })
  }

  getImageLink(productId, i) {
    this.service.getImageDetail(productId).subscribe((response) => {
      let product: any;
      console.log(response);
      if (response != null && this.checkProductExpiry(response[0])) {
        product = response[0];
        this.cart.products[i].productImage = response[0].productImage;
        this.cart.products[i].productPrice = response[0].productPrice;
        this.cart.products[i].productDescription =
          response[0].productDescription;
        this.cart.products[i].status = true;
        this.cart.totalPrice =
          this.cart.totalPrice +
          response[0].productPrice * this.cart.products[i].productQty;
      } else {
        this.cart.products[i].status = false;
        this.placeOrder = this.placeOrder && false;
      }

    });

  }

  deleteCartProduct(productDetail){
    this.service.deleteProduct(productDetail).subscribe((response)=>{
      if(response){
        let productsArray = this.cart.products.filter(product=>product.productId!=productDetail.productId);
        this.cart.products = productsArray;
        this.calculateTotalPrice();
        this.getNumberOfProductInStock();
      }
    })
  }

  getCart() {
    this.service.getCartDetail(this.decryptData(localStorage.getItem('email'))).subscribe((response) => {
      console.log(response);
      if (response) {
        this.cart = response;
        if (this.cart == 'Cart is empty') {
          this.cart=null;
        } else {
          this.shared.setMessage(this.cart.products.length)
          this.cart.totalPrice = 0;
          for (let i = 0; i < this.cart.products.length; i++) {
            this.getImageLink(this.cart.products[i].productId, i);
          }

        }
      }
    });
  }
  getNumberOfProductInStock() {
    let count = 0;
    this.placeOrder=true;
    if(this.cart){
      for (let product of this.cart.products) {
        console.log(product.status)
        if (!product.status) {
          this.placeOrder=false;
        }
      }
    }

  }

  decreaseQty(product) {
    let newCart = {
      userId: this.decryptData(localStorage.getItem('email')),
      productId: product.productId,
      productQty: product.productQty,
    };
    if (product.productQty == 1) {
      alert('product quantity cant be 0');
    } else {
      newCart.productQty = product.productQty - 1;
      // console.log(newCart.productQty);
      this.service.updateCartDetail(newCart).subscribe((res) => {
        if (res) {
          let itemIndex = this.cart.products.findIndex(
            (p) => p.productId == newCart.productId
          );
          let productItem = this.cart.products[itemIndex];
          productItem.productQty = newCart.productQty;
          console.log(this.cart);
          this.calculateTotalPrice()
        } else {
          alert('something went wrong please try again');
        }
      });
    }
  }
  increaseQty(product) {
    let newCart = {
      userId: this.decryptData(localStorage.getItem('email')),
      productId: product.productId,
      productQty: product.productQty,
    };
    newCart.productQty = product.productQty + 1;
    // console.log(newCart.productQty);
    this.service.updateCartDetail(newCart).subscribe((res) => {
      if (res) {
        let itemIndex = this.cart.products.findIndex(
          (p) => p.productId == newCart.productId
        );
        let productItem = this.cart.products[itemIndex];
        productItem.productQty = newCart.productQty;
        this.calculateTotalPrice()
      } else {
        alert('something went wrong please try again');
      }
    });
  }

  deleteProduct(productId){
    let productDetail={
      "productId":productId,
      "userId":this.decryptData(localStorage.getItem('email'))
    }
    this.deleteCartProduct(productDetail)
  }

  calculateTotalPrice(){
    var totalPrice = 0;
    for(let product of this.cart.products){
      if(product.productPrice){
        totalPrice = totalPrice + (product.productPrice * product.productQty)
      }

    }
    this.cart.totalPrice=totalPrice;
  }
  modelDisplay:boolean=false;
  confirmOrder(){
    let orderDetail={
      userId:this.decryptData(localStorage.getItem('email')),
      itemPurchased:this.cart.products,
      totalPrice:this.cart.totalPrice

    }
    this.placeOrderSubscribe(orderDetail);
    console.log(orderDetail);
    this.modelDisplay=false;
    this.route.navigate(['/checkout'])
  }

  showModel(){
    this.modelDisplay=true;
  }
  closeModel(){
    this.modelDisplay=false;
  }


}

import { Component, OnInit } from '@angular/core';
import { ViewProductService } from 'src/app/services/view-product.service';
// import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  public emptyProducts=false;
  constructor(private service:ViewProductService) { }
  public products:any=[];
  public newProducts:any=[];
  userId:"navaneetha@gmail.com";
  
  ontype(){
    var type = (<HTMLInputElement>document.getElementById("type")).value;
    console.log("option value"+type);
    this.newProducts=[];
    var today = new Date().toISOString().split('T')[0];
    this.service.getProducts().subscribe((response)=>{
      this.products=response;
      if(this.products.length < 1){
        this.emptyProducts=true
      }
      for(var i=0;i<this.products.length;i++){
        this.products[i].productStartDate = this.setDate(this.products[i].productStartDate);
        this.products[i].productEndDate = this.setDate(this.products[i].productEndDate);
        if(this.products[i].productEndDate > today && this.products[i].productType==type){
          //  console.log(this.products);
          console.log("hello");
          this.newProducts.push(this.products[i])
          console.log(this.newProducts[i]);
        }
        if(this.products[i].productEndDate > today && type=='all'){
          //  console.log(this.products);
          console.log("hello");
          this.newProducts.push(this.products[i])
          console.log(this.newProducts[i]);
        }
        
      }
      // console.log(this.newProducts);
    })

  }
  ngOnInit(): void {
    
    var today = new Date().toISOString().split('T')[0];
    this.service.getProducts().subscribe((response)=>{
      this.products=response;
      if(this.products.length < 1){
        this.emptyProducts=true
      }
      for(var i=0;i<this.products.length;i++){
        this.products[i].productStartDate = this.setDate(this.products[i].productStartDate);
        this.products[i].productEndDate = this.setDate(this.products[i].productEndDate);
        if(this.products[i].productEndDate > today){
          //  console.log(this.products);
          console.log("hello");
          this.newProducts.push(this.products[i])
          console.log(this.newProducts[i]);
        }
      }
      // console.log(this.newProducts);
    })
  }
  setDate(string) {
    return string.substr(0, string.indexOf('T'));
  }
 
  productDetails(productId){
    // console.log(productId);
    for(let product of this.newProducts)
    {
      if(product.productId==productId)
      {
        product.userId="nava@gmail.com";
        console.log("product:"+product.userId);
        this.service.createCart(product).subscribe((response)=>{
          console.log("response"+response);
          console.log("success");
          let btn = document.getElementById("button"+productId) as HTMLElement
          btn.innerHTML="Product Added";
          btn.style.backgroundColor = "green";
        })
      }
    }

  }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';

import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  {path:'home',component:HomeComponent},
  {path:'shop',component:ShoppingComponent},
  {path:'register',component:RegistrationComponent},
  {path:'signup',component:SignupComponent},
  {path:'viewProducts',component:ViewProductsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetComponent } from './components/reset/reset.component';


@NgModule({
  declarations: [UserComponent, FooterComponent, HeaderComponent, HomeComponent, ShoppingComponent, RegistrationComponent, SignupComponent, ResetComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }

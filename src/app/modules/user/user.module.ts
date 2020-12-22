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
import { ViewProductsComponent } from './components/view-products/view-products.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ResetComponent } from './components/reset/reset.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [UserComponent, FooterComponent, HeaderComponent, HomeComponent, ShoppingComponent, RegistrationComponent, SignupComponent, ResetComponent, UpdatePasswordComponent,ViewProductsComponent, ProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule
  ]
})
export class UserModule { }

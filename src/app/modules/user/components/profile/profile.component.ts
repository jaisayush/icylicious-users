import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private route:Router) { }
  email = localStorage.getItem('email')
  ngOnInit(): void {
  }


  showDeleteModal:boolean

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
    this.route.navigate(['update',{email:localStorage.getItem('email')}],{skipLocationChange:true})
  }

}

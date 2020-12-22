import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { SubscriberService } from 'src/app/services/subscriber.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private fb:FormBuilder,private _subscriptionService: SubscriberService) { }

  get email(){
    return this.subscribeForm.get('email')
  }
  ngOnInit(): void {
  }

  subscribeForm = this.fb.group({
    email: ['',[Validators.required,Validators.email,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
  })

  subscribe(){
    console.log(this.subscribeForm.value)
    this._subscriptionService.subscribe(this.subscribeForm.value)
        .subscribe(
          response => console.log("Success",response),
          error => console.log("error",error)
        )
    
    this.subscribeForm.reset();
  
  
  
  }

  showViewModal: boolean;

  showView() {
    this.showViewModal = true;
  }

  closeModal() {
    this.showViewModal = false;
  }


}

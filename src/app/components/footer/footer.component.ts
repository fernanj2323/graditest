import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})


export class FooterComponent {


  emailForm = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.email]),
  })


  sendEmail(){
    
     M.toast({html:"Subscribed "})
     this.emailForm.reset()
  }

}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/UserService/user.service';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

      myForm: FormGroup;
      msg ?: string
      constructor(private formBuilder: FormBuilder,private httpClient : HttpClient,private userService:UserService) {
        this.myForm = this.formBuilder.group({
          email: ['', [Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+(com|org|net|edu|gov|mil|biz|info|mobi|name|aero|jobs|museum)$/i), Validators.required, Validators.email]],
        });
      }


      get email(){return this.myForm.get('email');}
      Submit(){
       // console.log(this.email?.value)
        this.msg = '';
        if(this.email?.hasError('pattern') || this.email?.hasError('required')){
          this.msg="check your email !"
          alert(this.msg);
        }
        this.userService.ForgotPassword(this.email?.value).subscribe(
          (response) => {
            console.log('Request sent successfully');
          },
          (error) => {
            console.log('Error occurred during the request');
          }
        );
      }

}

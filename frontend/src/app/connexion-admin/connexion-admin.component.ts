import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion-admin',
  templateUrl: './connexion-admin.component.html',
  styleUrls: ['../connexion-user/connexion-user.component.css']
})
export class ConnexionAdminComponent {
  constructor(private fb :FormBuilder){}
  ConnexionForm= this.fb.group({
    email:['', [Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/) ,Validators.required] ,Validators.email],
    pwd:['',[Validators.pattern(/^.{8,}$/),Validators.required]]
  })
  validertous(){
    return this.ConnexionForm?.invalid == false;
  }
  get emailC(){
    return this.ConnexionForm.get('email');  
  }
  get pwdC(){
    return this.ConnexionForm.get('pwd');  
  }
  msg!:string
  submitclicked=false
  submitCclicked(){
    this.msg = "";
    this.submitclicked=true;
    if(this.emailC?.hasError('pattern') || this.emailC?.hasError('required')){
      this.msg="check your email !"
    }else{
      if(this.pwdC?.hasError('pattern') || this.pwdC?.hasError('required')){
        this.msg="password should contain at least 8 characters "
      }
    }    
    if(this.msg){
      alert(this.msg);
    }
  }
}

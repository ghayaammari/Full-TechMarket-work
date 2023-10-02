import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../classes/User';
import { UserService } from '../Services/UserService/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration-user',
  templateUrl: './registration-user.component.html',
  styleUrls: ['./registration-user.component.css']
})
export class RegistrationUserComponent {

  user:User = new User();
  constructor(private fb :FormBuilder,private userService:UserService,private route:Router){}

  
  RegistrationForm= this.fb.group({
    nom: ['', [Validators.pattern('^[a-zA-Z ]{3,}$'), Validators.required]],
    phone:['' ,[ Validators.pattern('[0-9]{3,}') ,Validators.required]],
    email: ['', [Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+(com|org|net|edu|gov|mil|biz|info|mobi|name|aero|jobs|museum)$/i), Validators.required, Validators.email]],
    pwd:['',[Validators.pattern(/^.{8,}$/),Validators.required]],
    role:[-1 ,[Validators.required ,Validators.min(0) ,Validators.max(1)]]
  })
  validertous(){return this.RegistrationForm?.invalid == false;}
  get emailR(){return this.RegistrationForm.get('email');}
  get pwdR(){return this.RegistrationForm.get('pwd');}
  get nomR() {return  this.RegistrationForm.get('nom')}
  get phoneR() {return  this.RegistrationForm.get('phone')}
  get roleR() {return  this.RegistrationForm.get('role')}
  msg!:string
  register(){
       this.msg = '';
    if(this.nomR?.hasError('pattern') || this.nomR?.hasError('required')){
      this.msg="check your name !"
    }else if(this.emailR?.hasError('pattern') || this.emailR?.hasError('required'))
    {
          this.msg="check your email !"
    }else if( this.phoneR?.hasError('pattern') || this.phoneR?.hasError('required'))
    {
      this.msg="check your phone number !"
    }
    else if(this.pwdR?.hasError('pattern') || this.pwdR?.hasError('required'))
    {
          this.msg="password should contain at least 8 caracters "
    }else if(this.roleR?.hasError('required') || this.roleR?.value==-1){
            this.msg="please select your role !"
    }
    else this.msg = "Registration has done successfully"
  
      // Display error message or submit the form
    if (this.msg != "Registration has done successfully") {
      alert(this.msg);
    } else {
      // Post method to send user data to the database
      if (this.validertous()) {
        this.userService.addUser(this.user).subscribe(
            (res) =>{
              console.log(res);
                alert(this.msg);
                this.route.navigate(['/ConnexionUser']);
            },
            (err) =>{
                alert("email or phone number already exists");
            }
          //alert(this.msg);
         // console.log(this.user);
          //this.route.navigate(['/ConnexionUser']);
        ); 
      }
    }
  }

}
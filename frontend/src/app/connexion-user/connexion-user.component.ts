import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../Services/UserService/user.service';
import { UserLogin } from '../classes/UserLogin';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/User';
import { authenticationResponse } from '../classes new/authenticationResponse';

@Component({
  selector: 'app-connexion-user',
  templateUrl: './connexion-user.component.html',
  styleUrls: ['./connexion-user.component.css'],
})
export class ConnexionUserComponent {
  user: any;
  variable!: string;
  userLogin: UserLogin = new UserLogin();
  userauth:any;
  sellerdataisset!:boolean;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router,
    private httpClient: HttpClient
  ) {}
  ConnexionForm = this.fb.group({
    email: [
      '',
      [
        Validators.pattern(
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+(com|org|net|edu|gov|mil|biz|info|mobi|name|aero|jobs|museum)$/i
        ),
        Validators.required,
        Validators.email,
      ],
    ],
    pwd: ['', [Validators.pattern(/^.{8,}$/), Validators.required]],
  });
  validertous() {
    return this.ConnexionForm?.invalid == false;
  }
  get emailC() {
    return this.ConnexionForm.get('email');
  }
  get pwdC() {
    return this.ConnexionForm.get('pwd');
  }
  msg!: string;

  Connexion() {
    this.msg = '';
    if (this.emailC?.hasError('pattern') || this.emailC?.hasError('required')) {
      this.msg = 'check your email !';
    } else if (
      this.pwdC?.hasError('pattern') ||
      this.pwdC?.hasError('required')
    ) {
      this.msg = 'password should contain at least 8 caracters ';
    }
    if (this.msg) {
      alert(this.msg);
    } else {
      //Login To DB
      // this.userService.Login(this.userLogin).subscribe();
      this.userService.Login(this.userLogin).subscribe(
        (response :authenticationResponse) => {
          const token = response.jwt.toString();
          this.userauth=response
          localStorage.setItem('Token', token);
          localStorage.setItem('userName', this.userauth.name);
          localStorage.setItem('role', this.userauth.role);

          if(this.userauth.role==1){
            this.userService.SellerDataIsSet().subscribe(result => {
              console.log("Seller Data is set:", result);
              this.sellerdataisset=result
              if(!this.sellerdataisset){
                this.route.navigate(['/dashboard/parametre-boutique']);
              }else{
                this.route.navigate(['/dashboard']);
              }
            });
          }else{
            if(this.userauth.role==0){

              
              // window.location.reload();
              this.route.navigate(['/']);
            }else{
              this.route.navigate(['/dashboard']);
            }
          }
          console.log(response)
        },
        (error) => {
          alert('Incorrect Password!');
          // Handle the error response
          //this.loginError = error.message;
        }
      );
    }
  }
}

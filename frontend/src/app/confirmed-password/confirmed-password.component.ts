import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmed-password',
  templateUrl: './confirmed-password.component.html',
  styleUrls: ['./confirmed-password.component.css']
})
export class ConfirmedPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  msg: string = '';
  token!:string;

  constructor(private formBuilder: FormBuilder, private router: Router , private httpClient:HttpClient,private route:ActivatedRoute) {}

  get password() {
    return this.resetForm.get('password');
  }

  get confirmPassword() {
    return this.resetForm.get('confirmPassword');
  }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.pattern(/^.{8,}$/), Validators.required]],
      confirmPassword: ['', [Validators.pattern(/^.{8,}$/), Validators.required]]
    });
    this.route.queryParams.subscribe(
      params =>{
        this.token = params['Token'];
      }
    );
   // alert(this.token);
  }

  submitForm(): void {
    this.msg = '';

    if (this.password?.hasError('pattern') || this.password?.hasError('required')) {
      this.msg = 'Password should contain at least 8 characters!';
     
      alert(this.msg);
    } else if (this.passwordsMismatch()) {
      this.msg = 'Passwords do not match!';
      alert(this.msg);
    } else {
      alert("password has been changed successfully !");
      console.log(this.token);console.log(this.password?.value);
      this.httpClient.get<string>(`http://localhost:6002/resetPassword/${this.token}/${this.password?.value}`).subscribe(
        (res) =>{
            
            //this.router.navigate(['/dashboard']);
        },
        (err) =>{

        }
      );
      this.router.navigate(['/ConnexionUser']);
//      console.log("2");
    }
    
  }

  passwordsMismatch(): boolean {
    const password = this.password?.value;
    const confirmPassword = this.confirmPassword?.value;
    return password !== confirmPassword;
  }
}

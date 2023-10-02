import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/UserService/user.service';
import { UpdatedUser } from 'src/app/classes/UpdatedUser';

@Component({
  selector: 'app-parametreconsommateur',
  templateUrl: './parametreconsommateur.component.html',
  styleUrls: ['./parametreconsommateur.component.css']
})
export class ParametreconsommateurComponent implements OnInit{
  
  user!:any;
  UserRole!:any;
  updatedUser:UpdatedUser = new UpdatedUser();
  userEmail!:any;
  Role!:any;
  role!:any;


  constructor(private route: ActivatedRoute , private userService:UserService ,private router:Router) {
    this.role = localStorage.getItem('role'); // Get the role value from localStorage
    console.log(this.role)
  }



  ngOnInit(): void {
   if(this.role == 2) 
   this.userEmail = this.route.snapshot.params['email'];
   else 
   this.userEmail = localStorage.getItem('UserEmail'); // Get the role value from localStorage
    this.userService.getUserByEmail(this.userEmail).subscribe(
      response => {
        this.user = response;
        console.log(this.user);
        if (this.user.role === 0) {
          this.UserRole = "Consumer";
        } else if (this.user.role === 1) {
          this.UserRole = "Seller";
        } else if (this.user.role === 2) {
          this.UserRole = "Admin";
        } else {
          this.UserRole = "Unknown Role";
        }
      },      
      error => {
        console.error('Error retrieving user', error);
      }
    );
    this.Role = this.user.Role === 1 ? 'Seller' : 'Consumer';
  
  }



 
 


  onRoleChange(selectedRole: number) {
    this.user.role  =  selectedRole;
  }

  handleUpdate() {
    if (window.confirm('Are you sure to update th Account ?')) {
      this.updatedUser.name = this.user.name;
      this.updatedUser.email = this.user.email;
      this.updatedUser.phone = this.user.phone;
      this.updatedUser.role = this.user.role;
      this.userService.updateUser(this.userEmail, this.updatedUser)
        .subscribe(
          response => {
            console.log('User updated successfully', response);
          },
          error => {
            console.error('Error updating user', error);
          }
        );
        if(this.role == 2)this.router.navigate(['/dashboard/gerervendeur']);
        else {this.router.navigate(['']);}
  }
}

  handleDelete() {
    const confirmDelete = window.confirm('Are you sure you want to delete your Account?');
    if (confirmDelete) {
      this.userEmail = localStorage.getItem('UserEmail');
      this.userService.deleteUserByEmail(this.userEmail).subscribe(
    response => {
        alert('User deleted successfully');
        this.router.navigate(['']);
    },
    error => {
        console.error('Error deleting user', error);
    }
    );
    }
    this.router.navigate(['']);
  }
}

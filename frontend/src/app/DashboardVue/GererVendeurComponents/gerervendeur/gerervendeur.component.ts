import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ClientService } from '../../service/client/client.service';
import { User } from 'src/app/classes/User';
import { UserService } from 'src/app/Services/UserService/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gerervendeur',
  templateUrl: './gerervendeur.component.html',
  styleUrls: ['./gerervendeur.component.css'],
})
export class GerervendeurComponent implements OnInit {
  clients?: User[] = [];
  searchclients: User[];
  selectedClient: User | null = null;
  role?:string;
  test?:boolean;
  email!:any;

  constructor(private clientService: ClientService,private userService:UserService , private router:Router) {
    this.clients = [];
    this.searchclients = this.clients;
    
  }




  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      users => {
        this.clients = users;
      },
      error => {
        alert("Error fetching users:");
      }
    );
  }

  searchv: any;

  showClientDetails(client: User): void {
    this.selectedClient = client;
    this.test = true;
  }

  cardClicked(event: Event): void {
    this.test = false;
  }

  deleteUser(user: User) {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
    this.email = user.email;
    this.userService.deleteUserByEmail(this.email).subscribe(
      response => {
        alert('User deleted successfully');
        window.location.reload(); // Reload the window
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
    }
    window.location.reload(); // Reload the window
  }

  handleUpdateClick(user: User) {
    const confirmDelete = window.confirm('Are you sure you want to update this user?');
    if (confirmDelete) {
      const email = user.email;
      this.router.navigate(['dashboard','parametreconsommateur' , email]);
    }
  }


  
}

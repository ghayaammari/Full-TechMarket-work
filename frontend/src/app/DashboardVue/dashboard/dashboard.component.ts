import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/UserService/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName!: any;
  role!: any;
  email!: any;
  sellerdataisset!: boolean;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    // Retrieve the user's name from localStorage
    this.userName = localStorage.getItem('userName');

    // Retrieve the user's role from localStorage
    this.role = localStorage.getItem('role');

    // Retrieve the user's email from localStorage
    this.email = localStorage.getItem('UserEmail');
  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width : 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.opened = 'true';
      }
    });
  }
  etat!: string;
  changeretat(_etat: string) {
    this.etat = _etat;
  }

  logout() {
    // Clear the userName from localStorage
    localStorage.removeItem('userName');

    // Clear the userName from localStorage
    localStorage.removeItem('Token');

    // Clear the userName from localStorage
    localStorage.removeItem('role');

    // Clear the UserEmail from localStorage
    localStorage.removeItem('UserEmail');

    // Navigate to the home page
    this.router.navigate(['']);
  }
  ManageProducs() {
    if (this.role == 1) {
      this.userService.SellerDataIsSet().subscribe((result) => {
        console.log('Seller Data is set:', result);
        this.sellerdataisset = result;
        if (!this.sellerdataisset) {
          // const gotoredirect =
          window.alert('You have to configure your shop information first !');
          // if(gotoredirect){
          this.router.navigate(['/dashboard/parametre-boutique']);
          // }
        } else {
          this.router.navigate(['/dashboard/gererProduct']);
        }
      });
    } else {
      this.router.navigate(['/dashboard/gererProduct']);
    }
  }
}

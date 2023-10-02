import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teknoshopp';

  user: boolean = false;
  admin:boolean=false;


  changerU(){
    this.user=!this.user;
    this.admin=false;
  }
}

import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/ProductService/product-service.service';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  isLoggedIn: boolean = false;
  nomUtilisateur: string = ''; // Variable pour stocker le nom de l'utilisateur
  isSlidenavOpen = false;
  menuVariable: boolean = false;
  menu_icon_variable: boolean = false;
  token:any
  role:any
  connected=false;
  consumer=false
  @ViewChild('showLoginButton', { static: true })
  showLoginButton!: TemplateRef<any>;
  name : any;
  constructor(private router: Router , private userService : UserService) {
    this.token=userService.token
    this.role=userService.role
  }

  ngOnInit() {
    // const token = localStorage.getItem('Token')
    // const role=localStorage.getItem('role')
    this.name=localStorage.getItem('userName')
    if(this.token!=null){
      this.connected=true
      if(this.role=="0"){
        this.consumer=true;
      }
    }
  }

  onCategoryChange(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
  }
  Search() {
    console.log('Recherche pour:', this.searchTerm);
  }

  deconnexion() {}

  goToParametresCompte() {
    // Rediriger vers le composant "connexion" pour afficher les paramètres du compte
    this.router.navigate(['/dashboardConsommateur']);
  }
  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }
  GoToMaSelection() {
    const token = localStorage.getItem('Token');
    const role = localStorage.getItem('role')

    if (token != null) {
     
      if(role=="0"){
         this.router.navigate(['/dashboard/ma-selection']);
      }else{
        
      }
    } else {
      alert("tu doit connecter avant d'aller vers ma selection");
      this.router.navigate(['/ConnexionUser']);
    }
  }
  GoToMesNotification() {
    const token = localStorage.getItem('Token');
    const role = localStorage.getItem('role')
    if (token != null) {
      
      if(role==="0"){
        this.router.navigate(['/dashboard/mes-notifications']);
      }else{
        
      }
    } else {
      alert("tu doit connecter avant d'aller vers ma selection");
      this.router.navigate(['/ConnexionUser']);
    }
  }
}

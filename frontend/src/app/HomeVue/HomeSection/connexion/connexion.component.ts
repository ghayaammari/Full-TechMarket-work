import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  handleSubmit() {
    // ... Votre code de connexion ...

    // Mettez à jour l'état de connexion dans le service AuthService
    this.authService.login();

    // Rediriger vers le dashboard ou la page home après la connexion réussie
    this.router.navigate(['/']);
  }
}

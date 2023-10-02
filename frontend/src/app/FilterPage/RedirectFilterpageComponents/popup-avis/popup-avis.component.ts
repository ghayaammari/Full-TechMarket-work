import { product } from 'src/app/FilterPage/models/product';
import { Component, Inject } from '@angular/core';
import { ProductserviceService } from '../../services/servicep/productservice.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ProductService } from 'src/app/Services/ProductService/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-avis',
  templateUrl: './popup-avis.component.html',
  styleUrls: ['./popup-avis.component.css'],
})
export class PopupAvisComponent {
  // produits!: product[];
  // num!:number;
  datars: product;
  ratingvalue=0
  title=""
  avis=""
  constructor(
    private produitService: ProductserviceService,
    private ref: MatDialogRef<PopupAvisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: product, private productService: ProductService , private router: Router
  ) {
    this.datars = data;
  }
  ratingcontrol= new FormControl(0);
 

  submitRate() {
    const token = localStorage.getItem('Token'); // Remplacez par votre token
    const IdProduct = this.datars.id; // Remplacez par l'ID du produit
    if(this.ratingcontrol.value!=null){
      this.ratingvalue=this.ratingcontrol.value
    }
    const note = this.ratingvalue;
     // Remplacez par la note
    const title = this.title // Remplacez par le titre (facultatif)
    const comment = this.avis; // Remplacez par le commentaire (facultatif)

    this.productService.AddAvisProduit(token, IdProduct, note, title, comment)
      .subscribe(response => {
        console.log(response);
        if(response.rateGivenbefore==false && response.rateadded==true){
          console.log("iam in")
          alert("Merci pour vous partager votre avis avec nous ")
          window.location.reload()

        }
        if(response.rateGivenbefore==true && response.rateadded==false){
          console.log("iam in")
          alert("Vous avez donner votre avis 9bal ")
          window.location.reload()

        }
      });
  }
}

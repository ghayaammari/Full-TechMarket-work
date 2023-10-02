import { Component } from '@angular/core';
import { MaselectionService } from '../../service/maselection/maselection.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/ProductService/product-service.service';
import { productFilter } from 'src/app/FilterPage/models/ProductFilter';

@Component({
  selector: 'app-ma-selection',
  templateUrl: './ma-selection.component.html',
  styleUrls: ['./ma-selection.component.css'],
})
export class MaSelectionComponent {
  produitsSelectionnes: productFilter[] = [];
  
  constructor( private productService: ProductService, private route: Router) {}

  ngOnInit(): void {
    // this.produitsSelectionnes = this.selectionService.getProduitsSelectionnes();
    const token = localStorage.getItem('Token')
    this.productService.GetMaSelectionProducts(token).subscribe(response=>{
      // {cantHaveProducts: false, listProduct: Array(1), listeVide: false}
      console.log(response)
      if(!response.listeVide){
        this.produitsSelectionnes=response.listProduct;
      }
    })
  }

  // supprimerProduit(produit: any): void {
  //   const confirmation = confirm(
  //     'Êtes-vous sûr de vouloir supprimer ce produit du panier ?'
  //   );
  //   if (confirmation) {
  //     this.selectionService.removeFromSelection(produit);
  //     console.log('Produit supprimé du panier :', produit);
  //   }
  // }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { productFilter } from 'src/app/FilterPage/models/ProductFilter';
import { ProductService } from 'src/app/Services/ProductService/product-service.service';

@Component({
  selector: 'app-suivre-prix',
  templateUrl: './suivre-prix.component.html',
  styleUrls: ['./suivre-prix.component.css']
})
export class SuivrePrixComponent {
  produitsSelectionnes: any[] = [];
  constructor( private productService: ProductService, private route: Router) {}
  ngOnInit(): void {
    // this.produitsSelectionnes = this.selectionService.getProduitsSelectionnes();
    const token = localStorage.getItem('Token')
    this.productService.getusersuivreprix(token).subscribe(response=>{
      // {cantHaveProducts: false, listProduct: Array(1), listeVide: false}
      console.log(response)

      // {haveproducts: true, canthahveproducts: false, listProduct: Array(3)}
      // listProduct: Array(3)  
      // 0 :  {prixAttendu: 0, product: {…}}
      // 1 :{prixAttendu: 0, product: {…}}
      // 2 :  {prixAttendu: 5, product: {…}}
      
      if(!response.canthahveproducts && response.haveproducts ){
      
        this.produitsSelectionnes=response.listProduct;
      }else{}
    })
  }

}

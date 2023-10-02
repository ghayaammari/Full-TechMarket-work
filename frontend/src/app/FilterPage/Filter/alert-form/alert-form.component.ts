import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { product } from 'src/app/FilterPage/models/product';
import { productFilter } from '../../models/ProductFilter';
import { ProductService } from 'src/app/Services/ProductService/product-service.service';

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.css'],
})
export class AlertFormComponent {
  datars: productFilter;
  priceA = 0;
  sender = 0;
  productexistinsuivreprix = false;
  constructor(
    private ref: MatDialogRef<AlertFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) {
    this.datars = data.datars;
    this.sender = data.sender;
    this.productexistinsuivreprix = data.productexist;
  }
  ngOnInit() {

    // ********************************************
    // ********************************************


    // if the sender is redirect page use the endpoint that tests if the prodct exist dans suive prix ou ma selection ken mahouch mawjoud f 7atta wa7da 
    console.log(
      'this.datars =',
      this.datars,
      '\n this.sender=',
      this.sender,
      '\n this.productexistinsuivreprix= ',
      this.productexistinsuivreprix
    );
  }
  AddSuivrePrixProduit() {
    //token
    //idProduct
    //priceA
    const token = localStorage.getItem('Token');
    const role = localStorage.getItem('role');
    if (role != null && role === '0' ) {
      this.productService
        .AddSuivrePrixProduit(token, this.datars.id, this.priceA)
        .subscribe(
          (response) => {
            console.log(response);
            // {added: false, theadded: null, cantAdd: false, productExist: true}
            if (!response.cantAdd && !response.productExist && response.added) {
              console.log('one **********');
              alert(
                'vous allez recevoire une notification lorsque le produit atteint le prix attendu'
              );
              this.ref.close();
              window.location.reload();
            }
            if (!response.cantAdd && response.productExist && !response.added) {
              console.log('tow  **************');
              alert(
                'you are following the price already // go to updat the price lehne bech nwali 9bal mana3mel el add ntasti ken el product suivi ken suivi el icon twalli update w yhezzo lel update '
              );
              this.ref.close();
              window.location.reload();
            }
          },
          (erroer) => {}
        );
    } else {
      alert(
        "produit n'est pas suivi tu doit etre consommateur pour suivre le prix d'un produit "
      );
      this.ref.close();
    }
  }
  UpdateSuivrePrixProduit() {
    const token = localStorage.getItem('Token')

    this.productService.UpdateUserSuivrePrix(token, this.datars.id, this.priceA).subscribe(response=>{
      console.log(response)
      
      if (!response.cantupdate && response.exist && response.updated) {
        console.log('tow  **************');
        alert(
          'vous avez modifier le prix attendu avec succes '
        );
        this.ref.close();
        window.location.reload();
      }
    })
  }
}

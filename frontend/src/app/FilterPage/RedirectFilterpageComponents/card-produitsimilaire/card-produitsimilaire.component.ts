// import { product } from './../../models/product';
import { Component, Input, OnInit } from '@angular/core';
// import { product } from 'src/app/FilterPage/models/product';
import { productFilter } from '../../models/ProductFilter';
import { MatDialog } from '@angular/material/dialog';
import { AlertFormComponent } from '../../../FilterPage/Filter/alert-form/alert-form.component';
import { ProductService } from 'src/app/Services/ProductService/product-service.service';

@Component({
  selector: 'app-card-produitsimilaire',
  templateUrl: './card-produitsimilaire.component.html',
  styleUrls: ['./card-produitsimilaire.component.css']
})
export class CardProduitsimilaireComponent implements OnInit{
 
  @Input('produitinfo') public produitinfo!:any;
  @Input('senderisNotifications') public  senderisNotifications : boolean;

  constructor( private matDialog: MatDialog , private productService: ProductService){
    this.senderisNotifications=false;
  }
   ngOnInit(){

  }
  openDialog(datars: any) {
    const token = localStorage.getItem('Token')
     if(token!=null){
       this.matDialog.open(AlertFormComponent, {
       width: '500px',
       data: {datars:datars , 
         sender:3 , 
         productexist:true}
       
     });
     }
    //  else{
    //    alert("tu doi se connecter avant de suivre le prix d'un produit  ")
    //    this.router.navigate(['ConnexionUser'])
    //  }
     
   }
   Delete(){
    const token = localStorage.getItem('Token')
    this.productService.DeleteUserSuivrePrix(token, this.produitinfo.product.id).subscribe(response=>{
      console.log(response)
      if (!response.cantdelte && response.exist && response.delted) {
        // {delted: true, exist: true, cantdelte: false}
        alert(
          'Produit supprimer'
        );
        window.location.reload();
      }
    })
   }

}

import { Subscription } from 'rxjs/internal/Subscription';
import { PopupAvisComponent } from '../../RedirectFilterpageComponents/popup-avis/popup-avis.component';
import { product } from 'src/app/FilterPage/models/product';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AlertFormComponent } from '../alert-form/alert-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ProductService } from 'src/app/Services/ProductService/product-service.service';
import { productFilter } from '../../models/ProductFilter';
@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css'],
})
export class ProductBoxComponent implements OnInit, OnDestroy , AfterViewInit{
  @Input() fullWidthMode = false;
  @Input('dataresieved') public dataresieved!: productFilter;
  @Input('senderisfilter') public filter: boolean;
  @Input('senderisRedirectP') public Rpage: boolean;
  @Input('ProductEMaSelection') public ProductEMaSelection: boolean
  @Input('senderismaselection') public maselection :boolean;
  @Input('senderismesnorifications') public mesnotifications : boolean;
  @Input('ProductESuivrePrix') public ProductESuivrePrix : boolean;
  // product!:productFilter
  thesender = 0;
  FinalRating = 0;
  nbrofpeoplerated = 0;
  // product:productFilter;
  id=''
  ESuivrePrix=false ; 
  EFav=false;
  subscriptin !: Subscription;
  constructor(private matDialog: MatDialog, private router: Router ,private productService: ProductService) {
    this.filter = false;
    this.Rpage = false;
    this.ProductEMaSelection=false 
    this.maselection=false
    this.mesnotifications=false;
    this.ProductESuivrePrix=false
    
  }
  ngAfterViewInit() {
    console.log('fel after view init ')
    console.log("this.dataresieved",this.dataresieved)
    console.log("this.thesender ", this.thesender)
    console.log("this.dataresieved",this.dataresieved)
    if(this.dataresieved.id!=null){
      this.id=this.dataresieved.id
      console.log('***********************id not null !!')
    }else{
      console.log("***************id null !!!!")
    }
    const token = localStorage.getItem('Token')
    const role =localStorage.getItem('role')
    if(role!=null && role =="0"){
      this.subscriptin =this.productService.TestProductESuivrePrixOrFav(token,this.id).subscribe(response=>{
      console.log(response)
      // console.log()
      // pemaselction
      this.ESuivrePrix=response.pesuivrePrix
      this.EFav=response.pemaselction
      // pesuivrePrix
      console.log("fel on init ")

    })
    }
  }
  ngOnInit(): void {
    console.log("fel OnINit mte3 product box ")
      if (this.filter) {
      this.thesender = 1;
      console.log("this.thesender ", this.thesender)
    } else { 
      if (this.Rpage) {
        // console.log('The sender is  redirected page ');
        this.thesender = 2;
        console.log("this.thesender ", this.thesender)
      } else {
        console.log("this.thesender ", this.thesender)
        if(this.maselection){
          this.thesender = 3
          console.log("this.thesender ", this.thesender)
        }else{
          console.log("this.thesender ", this.thesender)
          if(this.mesnotifications){
            this.thesender=4
            console.log("this.thesender ", this.thesender)
          }
        }
        console.log("this.thesender ", this.thesender)
        console.log('NO one considered ');
      }
    }
    
    
  }
  ngOnDestroy(): void {
    this.subscriptin?.unsubscribe();
  }
  // intialiserRating() {
  //   this.nbrofpeoplerated =
  //     this.dataresieved.rate.one +
  //     this.dataresieved.rate.two +
  //     this.dataresieved.rate.three +
  //     this.dataresieved.rate.four +
  //     this.dataresieved.rate.five;
  //   this.FinalRating =
  //     (this.dataresieved.rate.one * 1 +
  //       this.dataresieved.rate.two * 2 +
  //       this.dataresieved.rate.three * 3 +
  //       this.dataresieved.rate.four * 4 +
  //       this.dataresieved.rate.five * 5) /
  //     this.nbrofpeoplerated;
  // }
  // ngOnInit() {

    
  //   if (this.filter) {
  //     this.thesender = 1;
  //   } else {
  //     if (this.Rpage) {
  //       // console.log('The sender is  redirected page ');
  //       this.thesender = 2;
  //     } else {
  //       if(this.maselection){
  //         this.thesender = 3
  //       }else{
  //         if(this.mesnotifications){
  //           this.thesender=4
  //         }
  //       }
  //       console.log('NO one considered ');
  //     }
  //   }
  //   if(this.dataresieved.id!=null){
  //     this.id=this.dataresieved.id
  //     console.log('***********************id not null !!')
  //   }else{
  //     console.log("***************id null !!!!")
  //   }
  //   const token = localStorage.getItem('Token')
  //   const role =localStorage.getItem('role')
  //   if(role!=null && role =="0"){
  //     this.subscriptin =this.productService.TestProductESuivrePrixOrFav(token,this.id).subscribe(response=>{
  //     console.log(response)
  //     // console.log()
  //     // pemaselction
  //     this.ESuivrePrix=response.pesuivrePrix
  //     this.EFav=response.pemaselction
  //     // pesuivrePrix

  //   })
  //   }
    
  // }

  openDialog(datars: any) {
   const token = localStorage.getItem('Token')
   const role = localStorage.getItem('role')
    if(token!=null){
      if(role!=null && role=="0"){
            this.matDialog.open(AlertFormComponent, {
          width: '500px',
          data: {datars:datars , 
            sender:this.thesender , 
            productexist:this.ESuivrePrix}
          
        });
      }else{
        if(role!="0"){
          alert("tu doit etre consommateur pour suivre le prix du produit")
        }
      }
      
    }else{
      alert("tu doi se connecter avant de suivre le prix d'un produit  ")
      this.router.navigate(['ConnexionUser'])
    }
    
  }
  gotoRedirectPage() {
    this.router.navigate(['produit', this.dataresieved.id]);
  }

  role = '';
  openAvis(datasent: any) {
       const token = localStorage.getItem('Token')
       const role =localStorage.getItem('role')
    if(token==null){
      alert("tu doi se connecter avant donner votre avis sur un produit ")
      this.router.navigate(['ConnexionUser'])
    }else{
      if(role=="0"){
            this.matDialog.open(PopupAvisComponent, {
          width: '500px',
          data: datasent,
        });
      }else{
        alert("tu doit etre consommateur pour donner votre avis  ")
      }
      

    }
    
  }
  ajouteraufav(){
    const token = localStorage.getItem('Token')
    const role = localStorage.getItem('role')

    if(token==null){
      alert("tu doi se connecter avant d'ajouter votre avis a ta liste favorit")
      this.router.navigate(['ConnexionUser'])
    }else {
      if(role!=null && role=="0"){
        const confirmation =window.confirm("est vous su d'ajouter le produit a ma selection ? ")
        if(confirmation){
          this.productService.AjouterProduitAMaSelection(token,this.id ).subscribe(response=>{
                console.log(response)
                //  productAdded: true
                if(response.productAdded){
                  
                  
                  alert("produit ajouter avec succes !!")
                  // this.router.navigate(['/'])
                  window.location.reload();
                }
              },error=>{})
        }
        
      }else{
        if(role!=null && role!="0"){
          alert("tu doit etre consommateur pour ajouter un produit a votre liste de favorite ")
        }
      }
      
      //na3mlo el ajout bel endpoint 
      // ken produit ajouter au liste de favorit ntala3 alert produit ajouter + nbade el couleur mte3 el icon heart nrodha red 
      
    }
    
    
  }
  supprimerdefav(){
    console.log("dans supprimer")
    const token = localStorage.getItem('Token')
    this.productService.DeleteProductFromMaSelection(token,this.id ).subscribe(response=>{
      console.log(response)
      if(response){
        alert("Produit supprimer de ma selection")
        window.location.reload();
      }
      //  productAdded: true
      //  if(response.productAdded){
      //   alert("produit ajouter avec succes !!")
      //   // this.router.navigate(['/'])
      //   window.location.reload();
      // }
    },error=>{})
  }

}

import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupAvisComponent } from '../popup-avis/popup-avis.component';
import { MatDialog } from '@angular/material/dialog';
import { product } from 'src/app/FilterPage/models/product';
import { ProductserviceService } from '../../services/servicep/productservice.service';
import { ProductService } from 'src/app/Services/ProductService/product-service.service';
import { productFilter } from '../../models/ProductFilter';

@Component({
  selector: 'app-productredirectpage',
  templateUrl: './productredirectpage.component.html',
  styleUrls: ['./productredirectpage.component.css'],
})
export class ProductredirectpageComponent implements OnInit{
  @ViewChild('one') one!: ElementRef;
  @ViewChild('two') two!: ElementRef;
  @ViewChild('three') three!: ElementRef;
  @ViewChild('four') four!: ElementRef;
  @ViewChild('five') five!: ElementRef;

  // data: product;
  // data!:productFilter
  data:any

  // similairproduit: product[];
  similairproduit: any;
  widthofone = 0;
  widthoftwo = 0;
  widthofthree = 0;
  widthoffour = 0;
  widthoffive = 0;
  nbrofpeoplerated = 0;
  ratesforone = 0;
  ratesfortwo = 0;
  ratesforthree = 0;
  ratesforfour = 0;
  ratesforfive = 0;
  FinalRating = 0;
  id=""
  tableauRating: number[]=[0, 0, 0, 0, 0];
  constructor(
    private activatedroute: ActivatedRoute,
    private produitService: ProductserviceService,
    private matDialog: MatDialog, 
    private productService: ProductService , private router: Router
  ) {
    // this.data = this.produitService.consulterProduit(
    //   this.activatedroute.snapshot.params['id']
    // );
    // console.log("I am in the redirect page "+this.activatedroute.snapshot.params['id'])
    this.id=this.activatedroute.snapshot.params['id']
    // console.log(this.data);
    // console.log(
    //   this.produitService.filterProducts(this.data.categorie, this.data.nom)
    // );
    // this.similairproduit = this.produitService.filterProducts(
    //   this.data.categorie,
    //   this.data.nom
    // );
    
  }
  ngOnInit(): void {
    this.productService.getProductById(this.id).subscribe((result)=>{
      // console.log(result)
      this.data=result;
      console.log(this.data)
      this.IntialiseRatings();
      this.productService.getProduitSimilaire(this.data.category, this.data.marque ).subscribe((allproducts)=>{
        // console.log(allproducts);
        this.similairproduit=allproducts
      })
      //ba3d mane5o product data , ne5o el catgeorie wel marque w nselectiw les 
      //produits elli 3andhom meme categorie w meme marque 

    })
  }
  IntialiseRatings() {
    if(this.data.rates!=null){
      // console.log("the rating is not null ")
      // console.log("this.data.rates =",typeof(this.data.rates[0]))
      this.nbrofpeoplerated=this.data.rates.length;
      for (const numero of this.data.rates) {
        // console.log("numero = ",numero)
        // if (numero >= 1 && numero <= 5) {
          // console.log("before this.tableauRating[numero]",this.tableauRating[numero-1])
          this.tableauRating[numero-1]=this.tableauRating[numero-1]+1;
          // console.log("after this.tableauRating[numero]",this.tableauRating[numero-1])
          
        // }
      }
      this.ratesforone = (this.tableauRating[0] * 100) / this.nbrofpeoplerated;
      this.ratesfortwo = (this.tableauRating[1] * 100) / this.nbrofpeoplerated;
      this.ratesforthree = (this.tableauRating[2] * 100) / this.nbrofpeoplerated;
      this.ratesforfour = (this.tableauRating[3] * 100) / this.nbrofpeoplerated;
      this.ratesforfive = (this.tableauRating[4] * 100) / this.nbrofpeoplerated;

      this.widthofone = (this.tableauRating[0] * 400) / this.nbrofpeoplerated;
      this.widthoftwo = (this.tableauRating[1] * 400) / this.nbrofpeoplerated;
      this.widthofthree = (this.tableauRating[2] * 400) / this.nbrofpeoplerated;
      this.widthoffour = (this.tableauRating[3] * 400) / this.nbrofpeoplerated;
      this.widthoffive = (this.tableauRating[4] * 400) / this.nbrofpeoplerated;
      this.FinalRating =
        (this.tableauRating[0] * 1 +
          this.tableauRating[1] * 2 +
          this.tableauRating[2] * 3 +
          this.tableauRating[3] * 4 +
          this.tableauRating[4] * 5) /
        this.nbrofpeoplerated;
      
      // console.log("differnt de null this.nbrofpeoplerated =",this.nbrofpeoplerated ,"tableau de rates : ",this.tableauRating )
    }else{
      // console.log(" null this.nbrofpeoplerated =",this.nbrofpeoplerated,"tableau derates vide : ",this.tableauRating)
    }
    // this.nbrofpeoplerated =
    //   this.data.rate.one +
    //   this.data.rate.two +
    //   this.data.rate.three +
    //   this.data.rate.four +
    //   this.data.rate.five;
    // this.ratesforone = (this.data.rate.one * 100) / this.nbrofpeoplerated;
    // this.ratesfortwo = (this.data.rate.two * 100) / this.nbrofpeoplerated;
    // this.ratesforthree = (this.data.rate.three * 100) / this.nbrofpeoplerated;
    // this.ratesforfour = (this.data.rate.four * 100) / this.nbrofpeoplerated;
    // this.ratesforfive = (this.data.rate.five * 100) / this.nbrofpeoplerated;

    // this.widthofone = (this.data.rate.one * 400) / this.nbrofpeoplerated;
    // this.widthoftwo = (this.data.rate.two * 400) / this.nbrofpeoplerated;
    // this.widthofthree = (this.data.rate.three * 400) / this.nbrofpeoplerated;
    // this.widthoffour = (this.data.rate.four * 400) / this.nbrofpeoplerated;
    // this.widthoffive = (this.data.rate.five * 400) / this.nbrofpeoplerated;
    // this.FinalRating =
    //   (this.data.rate.one * 1 +
    //     this.data.rate.two * 2 +
    //     this.data.rate.three * 3 +
    //     this.data.rate.four * 4 +
    //     this.data.rate.five * 5) /
    //   this.nbrofpeoplerated;

  }

  ngAfterViewInit() {
    const _one = this.one.nativeElement;
    _one.style.width = `${this.widthofone}px`;
    const _two = this.two.nativeElement;
    _two.style.width = `${this.widthoftwo}px`;
    const _three = this.three.nativeElement;
    _three.style.width = `${this.widthofthree}px`;
    const _four = this.four.nativeElement;
    _four.style.width = `${this.widthoffour}px`;
    const _five = this.five.nativeElement;
    _five.style.width = `${this.widthoffive}px`;
  }
  

  // filtrerProduits() {


  //   this.produitsFiltres = this.products.filter((produit) => {
  //     // Filtrer par catégorie
  //     console.log("===============\ncategorie selectionner ",this.categoriesSelectionnees)
  //     console.log("marque selectionner ",this.marquesSelectionnees)
  //     console.log("minval ",this.minValToFilterWith)
  //     console.log("maxval ",this.maxValToFilterWith) 
  //     console.log("diponible : ",this.disponibiliteselectionne)

  //     if (this.categoriesSelectionnees.length > 0 && !this.categoriesSelectionnees.includes(produit.category)) {
        
  //       return false;
  //     }

  //     // Filtrer par marque
  //     if (this.marquesSelectionnees.length > 0 && !this.marquesSelectionnees.includes(produit.marque)) {
  //       return false;
  //     }

  //     // Filtrer par prix
  //     if (produit.price < this.minValToFilterWith || produit.price > this.maxValToFilterWith) {
        


  //       return false;
  //     }

  //     // Filtrer par disponibilité
  //     if (this.disponibiliteselectionne !== undefined && produit.disponibilite !== this.disponibiliteselectionne) {

  //       return false;
  //     }

  //     // Si toutes les conditions sont remplies, le produit est valide
  //     return true;
  //   });
  // }


  openAvis(datasent: any) {
    const role = localStorage.getItem("role")
    const token = localStorage.getItem("Token")
    
    if(token==null){
      alert("tu doi se connecter avant donner votre avis sur un produit ")
      this.router.navigate(['ConnexionUser'])
    }else{
      if(role!="0"){
            alert("tu doit etre consommateur pour donner votre avis ")
          }else{
            this.matDialog.open(PopupAvisComponent, {
            width: '500px',
            data: datasent,
          });
          }
    }
    
    
  }
  ProduitSimilaire(category :string , marque :string){

  }

  calculerOccurrence(tableau: number[]) {
    //const occurrences: number[] = [0, 0, 0, 0, 0, 0];
  
    for (const numero of tableau) {
      if (numero >= 0 && numero <= 5) {
        this.tableauRating[numero]=this.tableauRating[numero]+1;
      }
    }
  
    // return this.;
  }
}

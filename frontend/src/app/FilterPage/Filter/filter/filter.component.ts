import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { PaginatorIntlService } from '../paginator-intl.service';
import { ProductserviceService } from '../../services/servicep/productservice.service';
import { product } from 'src/app/FilterPage/models/product';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/ProductService/product-service.service';
import { productFilter } from '../../models/ProductFilter';
import { Subscription } from 'rxjs/internal/Subscription';
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class FilterComponent implements OnDestroy{


  produits! : product[];
  @ViewChild(MatDrawer) sidenav!: MatDrawer;
  max !:number;
  min !:number;
  marque = [
    'Samsung',
    'LG',
    'Whirlpool',
    'Bosch',
    'Electrolux',
    'Siemens',
    'Panasonic',
    'Haier',
    'Miele',
    'Sony',
    'Apple',
    'Microsoft',
    'Dell',
    'HP',
    'Lenovo',
    'Asus',
    'Acer',
    'Toshiba',
    'TCL',
    'Hisense',
    'Sharp',
    'Philips',
    'Vizio',
    'Sanyo',
    'Huawei',
    'Xiaomi',
    'OnePlus',
    'Google',
    'Motorola',
    'Nokia',
  ];
  categories=["Electromenager","Ordinateur","Smartphone","TV"]
  marquesAffichees: string[] = [];
  nombreMarquesAffichees = 4;
  indexMarqueActuel = 0;
  sort = '-----';
  productslength!: number;
    
  nbrofproducts = 12;
  pvp: any;
  pip: any;
  startIndexp!: number;
  endIndexp!: number;
  // hedhoma keno hakka 
  // data:product[]
  // dataslice:product[]
  // wallew hakka 
  data:any;
  dataslice:any
  cardsLength!: number;
  showfilter = false;
  datatosend: any;

  categoriesSelectionnees: string[] = [];
  marquesSelectionnees: string[] = [];
  disponibiliteselectionne!:boolean;
  
  Electromenager=false
  Ordinateur=false
  Smartphone=false
  TV=false
  products!:productFilter[]
  @ViewChild('minval') minValRef: any;

  // Utilisez @ViewChild pour accéder à la référence locale #maxval
  @ViewChild('maxval') maxValRef: any;
  minValToFilterWith!:number
  maxValToFilterWith!:number 
   produitsFiltres: any[] = [];
   mySubscription!: Subscription;
  //  idlist: string[]=[];
  //  idlistSuivreprix:string[]=[];
   userConnected!:boolean ; 
   userhaveproductsinmaselection!:boolean
   userhaveproductsinsuivreprix!:boolean
  constructor(private sidenavob: BreakpointObserver , private produitService: ProductserviceService , private productService: ProductService, private route: Router) {
    console.log("in the filter page ")
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  ngOnInit() {
      // this.data = this.produitService.listeProduits();
      this.mySubscription=this.productService.getAllProducts().subscribe(
        (data) => {
          // this.products = data;
          console.log(data);
          this.data=data;
          this.products=data
          // const prix :number
          const prix : number[]  = this.products.map(products => products.price);
        // const valeurMinimale = Math.min(...prix);
        //const minimal= 
        this.min=Math.min(...prix)
        //const maxval =
        this.max=Math.max(...prix)
        //maxval=this.max
        this.maxValRef.value =this.max
        this.minValRef.value=this.min
        console.log("maxValRef ", this.maxValRef," minValRef ",this.minValRef)
        console.log("La valeur minimale des prix est :", this.min,"max val : ", this.max);


        // const prixSansUndefined: number[] = this.products.filter(prix => prix !== undefined) as number[];
        //   // const valeurMinimale = Math.min(...prix);
        // const minimal= Math.min(...prixSansUndefined)
        // console.log("La valeur minimale des prix est :", minimal);

          // console.log(data)
          // console.log(this.data)
          // console.log(this.data?.slice(0,this.nbrofproducts))
          // console.log("the data is resieved ")
          if (this.data.length % this.nbrofproducts != 0) {
            this.productslength =
              Math.ceil(this.data.length / this.nbrofproducts) * this.nbrofproducts;
            console.log('this.productslength' + this.productslength);
            this.dataslice = this.data?.slice(0, this.nbrofproducts);
            // this.afficherProchainesMarques();
            
          } else {
            this.productslength = this.data.length;
            console.log('this.productslength' + this.productslength)
            this.dataslice = this.data?.slice(0, this.data.length);
          }

          
        },
        (error) => {
          console.log('Error fetching products:', error);
        }
      );
      this.afficherProchainesMarques();
      // this.TestTheProductEInSelection();
      // this.TestTheProductExistinSuivreprix()
    
  }
  ngAfterViewInit() {
    // console.log("after view init")
      // console.log(this.data);
      
      this.sidenavob.observe(['(max-width : 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.opened = true;
        
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.opened = 'true';
        
        }
      });
    }

  afficherProchainesMarques() {
    console.log("Afficher prochaine marque ")

    if(this.marque.length - this.indexMarqueActuel - this.nombreMarquesAffichees >= this.nombreMarquesAffichees) 
    {
    const prochainesMarques = this.marque.slice(this.indexMarqueActuel, this.indexMarqueActuel + this.nombreMarquesAffichees);
        this.marquesAffichees = this.marquesAffichees.concat(prochainesMarques);
        this.indexMarqueActuel += this.nombreMarquesAffichees;}
    else{
    const prochainesMarques = this.marque.slice(this.indexMarqueActuel);
      this.marquesAffichees = this.marquesAffichees.concat(prochainesMarques);
      this.indexMarqueActuel += this.nombreMarquesAffichees;}
  }

  voirPlus() {
    if (this.indexMarqueActuel < this.marque.length) {
      this.afficherProchainesMarques();
    }
  }
  afficherMoinsDeMarques() {
    console.log("Afficher moins de marques ");

    if (this.indexMarqueActuel >= this.nombreMarquesAffichees) {
        this.indexMarqueActuel -= this.nombreMarquesAffichees;

        if (this.indexMarqueActuel < 0) {
            this.indexMarqueActuel = 0;
        }

        this.marquesAffichees = this.marque.slice(0, this.indexMarqueActuel);
    } else {
        this.indexMarqueActuel = 0;
        this.marquesAffichees = [];
    }
}

voirMoins() {
    if (this.indexMarqueActuel >= this.nombreMarquesAffichees) {
        this.afficherMoinsDeMarques();
    }
}


  OnpageChangep(event: PageEvent) {
    this.pvp = event.previousPageIndex;
    this.pip = event.pageIndex;
    if (this.pvp < this.pip) {
      if (this.pvp === 0) {
        this.startIndexp = this.pvp + this.nbrofproducts;
        this.endIndexp = this.startIndexp + this.nbrofproducts;
      } else {
        this.startIndexp = this.nbrofproducts + this.nbrofproducts * this.pvp;
        this.endIndexp = this.startIndexp + this.nbrofproducts;
      }
    } else {
      if (this.pvp == Math.floor(this.data.length / 4)) {
        let nbderniercard =
          (this.data.length / this.nbrofproducts -
            Math.floor(this.data.length / this.nbrofproducts)) *
          this.nbrofproducts;
        this.endIndexp = this.data.length - nbderniercard;
        this.startIndexp = this.endIndexp - this.nbrofproducts;
      } else {
        this.endIndexp = this.pvp * this.nbrofproducts;
        this.startIndexp = this.endIndexp - this.nbrofproducts;
      }
    }
    this.dataslice = this.data.slice(this.startIndexp, this.endIndexp);
  }
  onSortUpdated(newSort: string): void {
    console.log("trie")
    if(newSort==="asc"){
      console.log("trie ascendant")
      this.dataslice=this.dataslice.slice().sort((a: { price: number; }, b: { price: number; }) => a.price - b.price);
    }
    if(newSort==="dsc"){
      console.log("trie descendant ")
      this.dataslice=this.dataslice.slice().sort((a: { price: number; }, b: { price: number; }) => b.price - a.price);
    }
    //this.sort = newSort;
  }

  // UpdatecCategorieSelecte(bal : number){
    
  //   if(bal==0){
  //     if(this.Electromenager){
  //     this.categoriesSelectionnees.push("Electromenager")

  //   }else{
  //     const index = this.categoriesSelectionnees.indexOf("Electromenager");
  //     this.categoriesSelectionnees.splice(index , 1)
  //   }
  //   }
  //   if(bal==1){
  //     if(this.Ordinateur){
  //     this.categoriesSelectionnees.push("Ordinateur")
      
  //   }else{
  //     const index = this.categoriesSelectionnees.indexOf("Ordinateur");
  //     this.categoriesSelectionnees.splice(index , 1)
  //   }
  //   }
  //   if(bal==2){
  //     if(this.Smartphone){
  //     this.categoriesSelectionnees.push("Smartphone")
      
  //   }else{
  //     const index = this.categoriesSelectionnees.indexOf("Smartphone");
  //     this.categoriesSelectionnees.splice(index , 1)
  //   }
  //   }
  //   if(bal==3){
  //     if(this.TV){
  //     this.categoriesSelectionnees.push("TV")
      
  //   }else{
  //     const index = this.categoriesSelectionnees.indexOf("TV");
  //     this.categoriesSelectionnees.splice(index , 1)
  //   }
  //   }
  //   console.log(this.categoriesSelectionnees)


  // }
  AfficherMarqueSelectionner(m : string){
    console.log(m)
    if(this.marquesSelectionnees.indexOf(m)!==-1){
      this.marquesSelectionnees.splice(this.marquesSelectionnees.indexOf(m),1)
      console.log(this.marquesSelectionnees)
    }else{
      this.marquesSelectionnees.push(m);
      console.log(this.marquesSelectionnees)
    }
  }
  AfficherCategorieSelectionner(m : string){
    console.log(m)
    if(this.categoriesSelectionnees.indexOf(m)!==-1){
      this.categoriesSelectionnees.splice(this.categoriesSelectionnees.indexOf(m),1)
      console.log(this.categoriesSelectionnees)
    }else{
      this.categoriesSelectionnees.push(m);
      console.log(this.categoriesSelectionnees)
    }
  }
  AfficherDisponibilteSelectionner(disp : boolean){
    console.log(disp)
    this.disponibiliteselectionne=disp
  }
  AfficherMinMaxChangedValue(min : string , max:string){
    console.log("Min :",min," Max :",max)
    this.maxValToFilterWith=parseFloat(max);
    this.minValToFilterWith=parseFloat(min)
  }
  Filter(){
    // console.log("fiter appeler")
    // // const dataf = new FormData();
    
    // if(this.marquesSelectionnees.length!=0 ){
    //   //const disponibiliteValue = this.categoriesSelectionnees.join(','); 
    //   console.log( this.marquesSelectionnees);

    // }

    // if(this.categoriesSelectionnees.length!=0 ){
    //   // const categorieValue = this.categoriesSelectionnees.join(','); 
    //   console.log("cattegorie", this.categoriesSelectionnees);
    // }
    // if(this.maxValRef.value!=null){
    //   console.log("min", this.maxValRef.value);
    // }
    // if(this.minValRef.value!=null){
    //   console.log("min", this.minValRef.value);
    // }
    // // dataf.append("x","aa")
    // // console.log(dataf)


  this.filtrerProduits();

  //this.dataslice=this.produitsFiltres
  if (this.produitsFiltres.length % this.nbrofproducts != 0) {
    this.productslength =
      Math.ceil(this.produitsFiltres.length / this.nbrofproducts) * this.nbrofproducts;
    console.log('different de 0 this.productslength' + this.productslength);
    this.dataslice = this.produitsFiltres?.slice(0, this.nbrofproducts);
    // this.afficherProchainesMarques();
    
  } else {
    this.productslength = this.produitsFiltres.length;
    console.log('egle 0  this.productslength' + this.productslength)
    this.dataslice = this.produitsFiltres?.slice(0, this.produitsFiltres.length);
  }
  console.log(this.produitsFiltres)

  }

  

  // constructor() {
  //   // Appeler la fonction de filtrage lors de l'initialisation du composant
  // 
  // }

  filtrerProduits() {


    this.produitsFiltres = this.products.filter((produit) => {
      // Filtrer par catégorie
      console.log("===============\ncategorie selectionner ",this.categoriesSelectionnees)
      console.log("marque selectionner ",this.marquesSelectionnees)
      console.log("minval ",this.minValToFilterWith)
      console.log("maxval ",this.maxValToFilterWith) 
      console.log("diponible : ",this.disponibiliteselectionne)

      if (this.categoriesSelectionnees.length > 0 && !this.categoriesSelectionnees.includes(produit.category)) {
        
        return false;
      }

      // Filtrer par marque
      if (this.marquesSelectionnees.length > 0 && !this.marquesSelectionnees.includes(produit.marque)) {
        return false;
      }

      // Filtrer par prix
      if (produit.price < this.minValToFilterWith || produit.price > this.maxValToFilterWith) {
        


        return false;
      }

      // Filtrer par disponibilité
      if (this.disponibiliteselectionne !== undefined && produit.disponibilite !== this.disponibiliteselectionne) {

        return false;
      }

      // Si toutes les conditions sont remplies, le produit est valide
      return true;
    });
  }

}
  // trierProduitsAscendant(produits: any[]): any[] {
  //   return produits.slice().sort((a, b) => a.prix - b.prix);
  // }

  // trierProduitsDescendant(produits: any[]): any[] {
  //   return produits.slice().sort((a, b) => b.prix - a.prix);
  // }
//   affiche(){
//     this.TestTheProductEInSelection();
//   }

//   responseofTestTheProductEInSelection=false;

//   TestTheProductEInSelection(){
//     const token = localStorage.getItem('Token')
//     if(token==null){
//       this.responseofTestTheProductEInSelection=false;
//       this.userConnected=false;
//     }else{
//       this.userConnected=true;
//       this.productService.GetMaSelectionIds(token).subscribe((result)=>{
//         if(result.idslist==null){
//           console.log("the id list is vide ")
//           console.log("this.idlist = ",this.idlist)
//           this.userhaveproductsinmaselection=false
//         }else{
//           console.log("the id list is not vide ")
//           this.idlist=result.idslist;
//           this.userhaveproductsinmaselection=true
//           console.log("this.idlist = ",this.idlist)
//         }
//       })
//     }
     
//   }
// productExistInMaselection(id : string):boolean{
//       return this.idlist.includes(id)
//     }
//     TestTheProductExistinSuivreprix(){
//       const token = localStorage.getItem('Token')
//       if(token==null){
//         this.responseofTestTheProductEInSelection=false;
//         this.userConnected=false;
//       }else{
//         this.userConnected=true;
//         this.productService.getsuivreprixids(token).subscribe((result)=>{
//           console.log(result)
//           if(result.length!=0){
//             console.log("the id list isnt  vide ")
//             this.idlistSuivreprix=result;
//             // console.log("this.idlist = ",this.idlist)
//             this.userhaveproductsinsuivreprix=true
//           }else{
//             console.log("the id list is  vide ")
//             // this.idlist=result.idslist;
//             this.idlistSuivreprix=result;
//             this.userhaveproductsinsuivreprix=false
//             // console.log("this.idlist = ",this.idlist)
//           }
//         })
//       }
//     }
//     productExistInSuivrePrix(id : string):boolean{
//       return this.idlistSuivreprix.includes(id)
//     }

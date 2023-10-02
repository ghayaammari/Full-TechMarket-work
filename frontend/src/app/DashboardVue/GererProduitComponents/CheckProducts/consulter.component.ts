import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Produit2 } from '../../model/produit2.model';
import { ModifierComponent } from '../UpdateProduct/modifier.component';
import { ProductDTO } from 'src/app/classes/PoductDTO';
import { ProductService } from 'src/app/Services/ProductService/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulter',
  templateUrl: './consulter.component.html',
  styleUrls: ['./consulter.component.css']
})
export class ConsulterComponent {
  products: ProductDTO[] = [];
 // produits?: Produit2[];
  formModal: any
  gettetdata:any
  datavide:any

  constructor(private dialogref : MatDialog , private productService:ProductService , private router: Router) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        // this.products = data;
        console.log(data);
      },
      (error) => {
        console.log('Error fetching products:', error);
      }
    );
    const token = localStorage.getItem('Token');
    this.productService.getUserProducts(token).subscribe((data)=>{
      console.log(data.products)
      this.datavide=data.haveproducts
      if(data.haveproducts){
        
        this.gettetdata=data.products
      }else{}
      
      
    })
  }
  deleteProduct(product: ProductDTO) {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');

    if (confirmDelete) {
      this.productService.deleteProduct(product).subscribe(
        (res) => {
          this.products = this.products.filter((product) => product.id !== product.id);
          alert(res); // Show the success message from the response directly
       
        },
        (error) => {
          alert("Product has been deleted Succefully !");
          console.log(error)
        }
      );
      window.location.reload();
    }
  }


  openDialog( categorie : string){
    this.dialogref.open(ModifierComponent,{
     width:'500px' , 
     data:{categorie:categorie},
    })
  }

  handleUpdateClick(product: ProductDTO) {
    const confirmDelete = window.confirm('Are you sure you want to update this product?');
    if (confirmDelete) {
    const productId = product.id;
    console.log(product.id);
    this.router.navigate(['dashboard','modifier', product.id]);
    }
  }
  
}
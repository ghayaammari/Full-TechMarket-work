import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/classes/PoductDTO';
import{ProductTobeUpdated} from 'src/app/classes/ProductTobeUpdated';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/Services/ProductService/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css'],
})


export class ModifierComponent implements OnInit{
  productDTO: ProductDTO = new ProductDTO();
  productTobeUpdated:ProductTobeUpdated = new ProductTobeUpdated();
  msg?: string;
  selectedImageFile!: File;
  fileName: string = '';
  id:any;
  selectedFile: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private routerActive:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.routerActive.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe(
      data => {this.productDTO = data;console.log(this.productDTO)
      },error => console.log(error)
    );
  }

  ProductRegistrationForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2,}$/)]],
    price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    description: ['', Validators.required],
    category: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2,}$/)]],
    urls: ['', Validators.required],
    image: ['', Validators.required],
  });

  get name() {
    return this.ProductRegistrationForm.get('name');
  }
  get price() {
    return this.ProductRegistrationForm.get('price');
  }
  get image() {
    return this.ProductRegistrationForm.get('image');
  }
  get description() {
    return this.ProductRegistrationForm.get('description');
  }
  get category() {
    return this.ProductRegistrationForm.get('category');
  }
  get url() {
    return this.ProductRegistrationForm.get('urls');
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.selectedImageFile = file;
    this.fileName = file ? file.name : '';
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile == undefined) {
      // No new image selected, retain the previous productDTO.imageUrl
      this.selectedFile = this.productDTO.imageUrl;
    }
  }
  

  UpdateProduct() {
    console.log(this.selectedFile);
      this.productTobeUpdated.name = this.productDTO.name;
      this.productTobeUpdated.price = this.productDTO.price;
      this.productTobeUpdated.category = this.productDTO.category;
      this.productTobeUpdated.description = this.productDTO.description;
      this.productTobeUpdated.urls = this.productDTO.urls;
      console.log(this.productTobeUpdated);
      console.log(this.selectedFile);
      this.productService.updateProduct(this.id,this.productTobeUpdated, this.selectedFile).subscribe(
        (res) => {
          alert("Product has been Updated Succefully !");
           // Refresh the page after successful response
           this.router.navigate(['dashboard','gererProduct']);
          //window.location.reload();
        },
        (error) => {
          alert("An error occurred");
        }
      );
  }
}
  
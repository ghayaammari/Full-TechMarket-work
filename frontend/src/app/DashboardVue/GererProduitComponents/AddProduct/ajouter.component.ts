import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/classes/PoductDTO';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/Services/ProductService/product-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css'],
})
export class AjouterComponent implements OnInit {
  productDTO: ProductDTO = new ProductDTO(); // Corrected the instance creation
  msg?: string;
  selectedImageFile!: File; 
  role !:any;
  fileName: string = ''; // Variable to store the selected file name
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
  constructor(private fb: FormBuilder, private productService: ProductService, private route: Router) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.role = localStorage.getItem('role');
  }
  ProductRegistrationForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    description: ['', Validators.required],
    category: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2,}$/)]],
    urls: ['', [Validators.required]],
    image: ['', [Validators.required]],
    nomfournisseur:['',[Validators.required]],
    marque:['',[Validators.required]]
    //token:['']
    


  });
  get name() { return this.ProductRegistrationForm.get('name') }
  get price() { return this.ProductRegistrationForm.get('price') }
  get image() { return this.ProductRegistrationForm.get('image') }
  get description() { return this.ProductRegistrationForm.get('description') }
  get category() { return this.ProductRegistrationForm.get('category') }
  get url() { return this.ProductRegistrationForm.get('urls') }
  get nomfournisseur() { return this.ProductRegistrationForm.get('nomfournisseur') }
  
  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.selectedImageFile = file;
    this.fileName = file ? file.name : ''; // Update the selected file name for display
  }


  
  addProduct() {
    this.msg = '';
    if (this.name?.hasError('pattern') || this.name?.hasError('required')) {
      this.msg = "check the product name !";
      alert(this.msg);
    } else if (this.price?.hasError('pattern') || this.price?.hasError('required')) {
      this.msg = "check the product price !";
      alert(this.msg);
    } else if (this.category?.hasError('pattern') || this.category?.hasError('required')) {
      this.msg = "please select product category !";
      alert(this.msg);
    } else if (this.description?.hasError('pattern') || this.description?.hasError('required')) {
      this.msg = "check the product description !";
      alert(this.msg);
    } else if (this.url?.hasError('required')) {
      this.msg = "check the product URL !";
      alert(this.msg);
    } 
    else if(this.role==2  && this.nomfournisseur?.hasError('required')){
      this.msg = "check nom fournisseur  !";
      alert(this.msg);
    }
    else if (this.image?.hasError('required')) {
      this.msg = "please select product image !";
      alert(this.msg);
    } else {
      if (!this.selectedImageFile) {
        alert("Please select a product image!");
        return; // Stop further execution if no image selected
      }
  
      const productToAdd = this.ProductRegistrationForm.value;
      console.log(this.ProductRegistrationForm.get('marque')?.value)
      console.log(productToAdd );
      const token = localStorage.getItem("Token");
      this.productService.addProduct(productToAdd, this.selectedImageFile, token).subscribe((res) => {
          console.log(res);
          //window.location.reload
          if(res){

          alert("Product added sucessfully")
          this.route.navigate(["/dashboard"])
          //   //window.location.reload
          //   this.route.navigate(['dashboard','gererProduct']);
          }else {
            alert("A problem accured try later ")
          }
        });
        // window.location.reload
        
      // this.productService.createProduct(productToAdd, this.selectedImageFile).subscribe(
      //   (res) => {
      //     alert("Product has been Added Succefully !");
      //      // Refresh the page after successful response
      //      window.location.reload();

      //   },
      //   (error) => {
      //     alert("An error occurred");
      //   }
      // );
    }
  }
  
}

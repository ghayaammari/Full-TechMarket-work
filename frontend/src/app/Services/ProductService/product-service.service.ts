import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDTO } from '../../classes/PoductDTO';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:6002/register/product';
  private apigetUrl = 'http://localhost:6002/getProducts';
  private apideleteUrl = 'http://localhost:6002/delete';
  private getproduct = 'http://localhost:6002/getProductById';
  private apiUpdateUrl = 'http://localhost:6002/UpdateProducts';
  private produitsimiaireUrl='http://localhost:6002/Produitsimilaire';
  private addrate ='http://localhost:6002/ProductAddRate';
  private getMaSelctionidsUrl ='http://localhost:6002/getMaSelectionIds'
  private getMaSelectionProducts='http://localhost:6002/GetMaSelection'
  private addProuctAMaselectioUrl='http://localhost:6002/AddMaSelection'
  private deleteProductFromMaSelection='http://localhost:6002/MaSelectionDeletePr'
  private addSuivrePrixProduitUrl='http://localhost:6002/AddsuivrePrix'
  private getsuivreprixidsUrl='http://localhost:6002/getSuivrePrixIds'
  private getusersuivreprixUrl='http://localhost:6002/GetUserSuivrePrix'
  private TestProductESuivrePrixOrFavUrl='http://localhost:6002/TestProductESM'
  private UpdateUserSuivrePrixUrl ='http://localhost:6002/UpdateUserSuivrePrix'
  private DeleteUserSuivrePrixUrl ='http://localhost:6002/DelteUserSuivrePrix'
  constructor(private httpClient: HttpClient) { }

  createProduct(productData: any, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price.toString());
    formData.append('category', productData.category);
    formData.append('description', productData.description);
    formData.append('image', imageFile); 
    formData.append('urls', productData.urls);
    return this.httpClient.post<any>(this.apiUrl, formData);
  }
  addProduct(productData : any , imageFile : File , token: any) : Observable <any>{
    const formData = new FormData();
    const newURL = "http://localhost:6002/addProduct" 
    formData.append('token',token);
    formData.append('name', productData.name);
    formData.append('price', productData.price.toString());
    formData.append('category', productData.category);
    formData.append('description', productData.description);
    formData.append('image', imageFile);
    formData.append('url', productData.urls)
    formData.append('nomfournisseur',productData.nomfournisseur)
    formData.append('marque',productData.marque)
    return this.httpClient.post(newURL , formData )
  }
  getAllProducts(): Observable<any> {
     const token = localStorage.getItem('Token');
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}` 
     });
    return this.httpClient.get<any>(this.apigetUrl );
  } 
  deleteProduct(product: ProductDTO): Observable<any> {
     const token = localStorage.getItem('Token');
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}` 
     });
    const url = `${this.apideleteUrl}/${product.id}`;
    return this.httpClient.delete<any>(url , {headers});
  }
  getProductById(id:String):Observable<any>{
     const token = localStorage.getItem('Token');
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}` 
     });
    return this.httpClient.get<any>(`${this.getproduct}/${id}` );
  }
  updateProduct(id:string , productData: any, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price.toString());
    formData.append('category', productData.category);
    formData.append('description', productData.description);
    formData.append('image', imageFile); 
    formData.append('urls', productData.urls);
    return this.httpClient.put<any>(`${this.apiUpdateUrl}/${id}`, formData);
  }
  getUserProducts(token: any): Observable<any> {
    const url = "http://localhost:6002/FindUserProducts";
    const params = new HttpParams().set('token', token);
    return this.httpClient.get<any>(url, { params });
  }
  getProduitSimilaire(categorie: string , marque :string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const params = new HttpParams()
      .set('categorie', categorie)
      .set('marque', marque);
    return this.httpClient.get<any>(this.produitsimiaireUrl,{ headers, params });   
  }
  AddAvisProduit(token: any, IdProduct: string, note: number, title: string, comment: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }); 
    const params = new HttpParams()
      .set('token', token)
      .set('IdProduct', IdProduct)
      .set('note',note)
      .set('title',title)
      .set('comment',comment);
    return this.httpClient.post(this.addrate, null, {  headers , params});
  }
  GetMaSelectionProducts(token:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
    const params = new HttpParams()
      .set('token', token);
    return this.httpClient.get(this.getMaSelectionProducts ,  {  headers , params});
  }

  AjouterProduitAMaSelection(token: any , IdProduct : string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
    const params = new HttpParams()
      .set('token', token)
      .set('IdProduct',IdProduct);
    return this.httpClient.post(this.addProuctAMaselectioUrl  ,  null,{  headers , params})
  }
  DeleteProductFromMaSelection(token: any , IdProduct : string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
    const params = new HttpParams()
      .set('token', token)
      .set('IdProduct',IdProduct);
    return this.httpClient.delete(this.deleteProductFromMaSelection ,{headers , params})
  }
  AddSuivrePrixProduit(token : any , IdProduct :string ,priceA :number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
    const params = new HttpParams()
      .set('token', token)
      .set('IdProduct',IdProduct)
      .set('priceA',priceA.toString());
    return this.httpClient.post(this.addSuivrePrixProduitUrl ,null,{headers , params})
  }

  getusersuivreprix(token : any ):Observable <any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
    const params = new HttpParams()
      .set('token', token);
    return this.httpClient.get(this.getusersuivreprixUrl ,{headers , params})
  }
  UpdateUserSuivrePrix(token : any , IdProduct:string , priceA : number ):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
    const params = new HttpParams()
      .set('token', token)
      .set('IdProduct',IdProduct)
      .set('priceA',priceA.toString());
    return this.httpClient.put(this.UpdateUserSuivrePrixUrl ,null,{headers , params})
  }
  DeleteUserSuivrePrix(token : any , IdProduct:string ):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
    const params = new HttpParams()
      .set('token', token)
      .set('IdProduct',IdProduct);
    return this.httpClient.delete(this.DeleteUserSuivrePrixUrl ,{headers , params})
  }

  TestProductESuivrePrixOrFav(token : any , idP : string ) :Observable <any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
    const params = new HttpParams()
      .set('token', token)
      .set('idP',idP);
    return this.httpClient.get(this.TestProductESuivrePrixOrFavUrl ,{headers , params})
  }

  getsuivreprixids(token : any ):Observable <any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
    const params = new HttpParams()
      .set('token', token);
    return this.httpClient.get(this.getsuivreprixidsUrl ,{headers , params})
  } 
   GetMaSelectionIds(token : any ):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
    const params = new HttpParams()
      .set('token', token);
    return this.httpClient.get(this.getMaSelctionidsUrl ,  {  headers , params});
  }
}

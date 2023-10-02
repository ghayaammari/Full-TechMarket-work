import { Produit2 } from './../../model/produit2.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions={
  header:new HttpHeaders({'Content-Type':'application/json'})

}
@Injectable({
  providedIn: 'root'
})
export class Produit2Service {
  produits: Produit2[]=[]; 
  produit!: Produit2;

  //for spring boot
  private apiURL: string = 'http://localhost:8080/api/products'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) {
    this.produits.push (
      { categoryProduit: "ordinateur", nomProduit: "PC Asus", prixProduit: 3000.600,urls:["https://getbootstrap.com/  https://getbootstrap.com/"], description: "Le ASUS Studiobook est équipé d'une carte graphique NVIDIA® Q" , imageUrl: "../assets/pc1.png"},
      { categoryProduit: "telephone", nomProduit: "Imprimante Epson", prixProduit: 450,urls:["https://getbootstrap.com/"], description: "Imprimante Jet d'encre Multifonction Couleur A4 - Fonctions: 3en1 Impression,  Vitesse d'impession: 33 ppm (N&B), 15 ppm (Couleur) - Résolution d'impression: 5760x1440 dpi -Vitesse de Numérisation: 11s noir, 28s couleur (200 DPI) -Résolution de la numérisation: 1200x2400 dpi , 20 Feuilles photo, 30 Feuilles (bac de sortie) -Recto/verso Manuel -Connectivité: USB, Wi-Fi, Wi-Fi Direct - Garantie : 1 an Possible Extension de garantie 3 ans sur le site https://www.epson.eu/fr/promotions/extended-warranty",imageUrl: "../assets/pc3.jpg" },
      { categoryProduit: "telephone", nomProduit: "Tablette Samsung", prixProduit: 900.123,urls:["https://getbootstrap.com/"], description: "This tablet features the Samsung octa-core chipset, which consists of 1.9 GHz and 1.3 GHz quad-core processors, and has 3GB of RAM. " ,imageUrl: "../assets/phone.jpg"}
    )

    
  }
  listeProduits(): Produit2[] {
    return this.produits;
        // return this.http.get<Produit[]>(this.apiURL);    (For spring boot)

  }
  ajouterProduit(prod: Produit2) // : Observable<Produit>   (ajouter ça pour spring boot)
   { this.produits.push(prod); // pour spring boot    remplacer cette ligne par le code suivant ( return this.http.post<Produit>(this.apiURL, produit);)

  }

   

  

  supprimerProduit(prod: Produit2) {
    const index = this.produits.indexOf(prod, 0);
    if (index > -1) {
      this.produits.splice(index, 1);
    }
  }

 // code de supprimerProduit avec spring boot ( supprimerProduit(id: number): Observable<void> {
  //  return this.http.delete<void>(`${this.apiURL}/${id}`);
  //})
    
  

  consulterProduit(category: string): Produit2 {
    this.produit = this.produits.find(p => p.categoryProduit == category)!;
    return this.produit;
  }

  updateProduit(p: Produit2) {
    // Construct the URL for the PUT request to update the specific product (you may need to adjust the API URL based on your backend implementation)
    const url = `${this.apiURL}/${p.categoryProduit}`;
  
    // Set the headers for the PUT request (optional)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Produit2>(url, p, httpOptions);
  }


    // code du updateProduit  avec spring boot: (
     // updateProduit(produit: Produit): Observable<Produit> {
     //   return this.http.put<Produit>(`${this.apiURL}/${produit.id}`, produit);
     // }
   // )

  
    // Send the PUT request to update the product
    // The `p` object contains the updated product information, including the new image URL
  

url = 'https://img.icons8.com/ios/100/000000/contract-job.jpg';
  
onSelect(event: any, produit: any) {
  const files = event.target.files;
  produit.photo = files[0]; // Store the selected image file directly in the product's 'photo' property

  // Read the selected image and store its URL in the product's 'photoUrl' property
  let reader = new FileReader();
  reader.readAsDataURL(produit.photo);
  reader.onload = (event: any) => {
    produit.photoUrl = event.target.result;
  };
}
//rechercherParName(name:string):Observable<Produit[]>{
  //const url=`${this.apiURL}/prodsname/${name}`;
 // return this.http.get<Produit[]>(url);
//}

}
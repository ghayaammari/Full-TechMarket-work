import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaselectionService {
  private produitsSelectionnes: any[] = [];

  constructor() { }

  addToSelection(produit: any): void {
    this.produitsSelectionnes.push(produit);
  }

  getProduitsSelectionnes(): any[] {
    return this.produitsSelectionnes;
  }

  removeFromSelection(produit: any): void {
    const index = this.produitsSelectionnes.indexOf(produit);
    if (index !== -1) {
      this.produitsSelectionnes.splice(index, 1);
    }
  }
}

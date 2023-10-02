export interface product {
  id: string;
  nom: string;
  description: string;
  categorie: string;
  imgURL: string;
  disponibilite: boolean;
  prix: number;
  marque: string;
  rate: {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
  };
  productowner: {
    nomboutique: string;
    urlproduit: string;
    ownerlogo: string;
  };
}

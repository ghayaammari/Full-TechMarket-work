import { Injectable } from '@angular/core';
import { product } from 'src/app/FilterPage/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductserviceService {
  products!: product[];
  _product!: product;

  constructor() {
    this.products = [
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        categorie: 'smartphone',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',

        prix: 1230,
        marque: 'Apple',
        disponibilite: false,
        id: '1',
        rate: {
          one: 5,
          two: 0,
          three: 3,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'TV Samsung ',
        description: 'new new new TV ',
        imgURL:
          'https://www.samsungtunisie.tn/5030-large_default/samsung-32-hd-smart-tv-32t5300-prix-tunisie.jpg',
        categorie: 'tv',
        prix: 950,
        marque: 'Samsung',
        disponibilite: true,
        id: '2',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'PC Portable LENOVO ThinkBook ',
        description: 'new new new Lenovo pc ',
        imgURL:
          'https://mk-media.mytek.tn/media/catalog/product/cache/8be3f98b14227a82112b46963246dfe1/2/0/20ve00egfe-16g_1.jpg',
        categorie: 'ordinateur',
        prix: 1470,
        marque: 'Lenovo',
        disponibilite: false,
        id: '3',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'TV Sony Bravia LED Full HD',
        description: 'new new new Sony tv fullHD ',
        imgURL:
          'https://www.tunisianet.com.tn/251891-large/tv-sony-bravia-led-full-hd-50-kdl-50wf665-smart.jpg',
        categorie: 'tv',
        prix: 1800,
        marque: 'Sony',
        disponibilite: true,
        id: '3',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Téléphone Portable Motorola Moto G5',
        description: 'new new new Motorola G5',
        imgURL:
          'https://www.tunisianet.com.tn/74110-large/moto-g5-tunisie-gris.jpg',
        categorie: 'smartphone',
        prix: 610,
        marque: 'Motorola',
        disponibilite: false,
        id: '5',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'LAVE VAISSELLE WHIRLPOOL 14 ',
        description: 'new new new whirlpool product',
        imgURL:
          'https://www.allani.tn/374-large_default/lave-vaisselle-whirlpool-14-cv-wfo-3t223-65px-inox-6eme-sens.jpg',
        categorie: 'electromenager',
        prix: 870,
        marque: 'Whirlpool',
        disponibilite: true,
        id: '6',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Smartphone SAMSUNG GALAXY A14',
        description: 'Samsung new product',
        imgURL:
          'https://mk-media.mytek.tn/media/catalog/product/cache/8be3f98b14227a82112b46963246dfe1/a/1/a14-silver_1_2.jpg',
        categorie: 'smartphone',
        prix: 1000,
        marque: 'Samsung',
        disponibilite: false,
        id: '7',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'tv',
        prix: 1300,
        marque: 'Samsung',
        disponibilite: true,
        id: '8',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'ordinateur',
        prix: 1470,
        marque: 'Lenovo',
        disponibilite: false,
        id: '9',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'tv',
        prix: 1800,
        marque: 'Sony',
        disponibilite: true,
        id: '10',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'smartphone',
        prix: 610,
        marque: 'Motorola',
        disponibilite: false,
        id: '11',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'electromenager',
        prix: 870,
        marque: 'Whirlpool',
        disponibilite: true,
        id: '12',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'smartphone',
        prix: 1230,
        marque: 'Apple',
        disponibilite: true,
        id: '13',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'tv',
        prix: 950,
        marque: 'Samsung',
        disponibilite: true,
        id: '14',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'ordinateur',
        prix: 1470,
        marque: 'Lenovo',
        disponibilite: false,
        id: '15',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'tv',
        prix: 1800,
        marque: 'Sony',
        disponibilite: true,
        id: '16',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'smartphone',
        prix: 610,
        marque: 'Motorola',
        disponibilite: false,
        id: '17',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'electromenager',
        prix: 870,
        marque: 'Whirlpool',
        disponibilite: true,
        id: '18',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'smartphone',
        prix: 1230,
        marque: 'Apple',
        disponibilite: true,
        id: '19',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'tv',
        prix: 950,
        marque: 'Samsung',
        disponibilite: true,
        id: '20',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'ordinateur',
        prix: 1470,
        marque: 'Lenovo',
        disponibilite: false,
        id: '21',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'tv',
        prix: 1800,
        marque: 'Sony',
        disponibilite: true,
        id: '22',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'smartphone',
        prix: 610,
        marque: 'Motorola',
        disponibilite: false,
        id: '23',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'electromenager',
        prix: 870,
        marque: 'Whirlpool',
        disponibilite: true,
        id: '24',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
      {
        nom: 'Apple 13',
        description: 'new new new Apple',
        imgURL:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-model-unselect-gallery-1-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1654893619853',
        categorie: 'electromenager',
        prix: 870,
        marque: 'Whirlpool',
        disponibilite: true,
        id: '25',
        rate: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        productowner: {
          nomboutique: 'jumia',
          urlproduit: 'jumia.com.tn',
          ownerlogo: 'jumia.com.tn',
        },
      },
    ];
  }

  listeProduits(): product[] {
    return this.products;
  }
  consulterProduit(id: string): product {
    this._product = this.products.find((p) => p.id == id)!;
    return this._product;
  }
  filterProducts(category: string, nameKeyword: string): product[] {
    return this.products.filter(
      (product) =>
        product.categorie.toLowerCase() === category.toLowerCase() &&
        product.nom.toLowerCase().includes(nameKeyword.toLowerCase())
    );
  }
  // SelectProduitSimilaire(): product[]{
  //   return this.products.filter()
  // }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '@core/models/product.model';
import { CartService } from '@core/services/cart/cart.service';

@Pipe({
  name: 'countProducts'
})
export class CountProductsPipe implements PipeTransform {

  products: any[];

  constructor(private cartService: CartService) {
  }

  transform(newProduct: Product[]): any {
    newProduct.forEach(product => {
      if (this.products.length === 0) {
        this.products.push(Object.assign(product, { quantity: 1 }));
      } else {
        const repeatedProduct = this.products.findIndex(p => p.id === product.id);
        if (repeatedProduct === -1) {
          this.products.push(Object.assign(product, { quantity: 1 }));
        } else {
          this.products[repeatedProduct].quantity += 1;
        }
      }
    });
    return this.products;
  }
}

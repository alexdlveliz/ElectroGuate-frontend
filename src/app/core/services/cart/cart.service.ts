import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from './../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);
  private element: number;

  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(product: Product): void {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }

  deleteItem(deleteProduct: Product): void {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === deleteProduct.id) {
        this.element = i;
        break;
      }
    }
    this.products.splice(this.element, 1);
    this.cart.next(this.products);
  }

  deleteFromCart(product: Product): void {
    this.products = this.products.filter(productElement => {
      return productElement !== product;
    });
    this.cart.next(this.products);
  }

  clearCart(): void {
    this.products = [];
    this.cart.next(this.products);
  }
}

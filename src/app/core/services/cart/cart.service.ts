import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from './../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(product: Product): void {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }

  deleteFromCart(product: Product): void {
    console.log(this.products);
    this.products = this.products.filter(productElement => {
      return productElement !== product;
    });
    console.log(this.products);
    this.cart.next(this.products);
  }
}

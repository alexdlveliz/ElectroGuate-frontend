import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@core/models/product.model';
import { CartService } from '@core/services/cart/cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['image', 'str_name', 'int_price', 'actions'];
  items$: Observable<Map<Product, number>>;
  listItems: Map<Product, number>;
  constructor(
    private cartService: CartService
  ) {
    this.setItems();
  }

  ngOnInit(): void {
  }

  setItems(): void {
    this.items$ = this.cartService.cart$.pipe(
      map(products => {
        this.listItems = new Map();
        products.forEach(product => {
          let count = 1;
          if (this.listItems.has(product)) {
            count = this.listItems.get(product) + 1;
          }
          this.listItems.set(product, count);
        });
        return this.listItems;
      })
    );
  }

  addItem(product: Product): void {
    const value = this.listItems.get(product);
    this.listItems.set(product, value + 1);
    this.cartService.addCart(product);
    this.setItems();
  }

  deleteItem(product: Product): void {
    const value = this.listItems.get(product);
    this.listItems.set(product, value - 1);
    if (value - 1 === 0) {
      this.cartService.deleteFromCart(product);
      this.setItems();
    } else {
      this.cartService.deleteItem(product);
    }
  }

  deleteProduct(product: Product): void {
    if (confirm('¿Seguro que desea eliminarlo?')) {
      this.cartService.deleteFromCart(product);
    }
  }

}

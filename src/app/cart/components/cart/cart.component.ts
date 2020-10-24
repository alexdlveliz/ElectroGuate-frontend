import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@core/models/product.model';
import { CartService } from '@core/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['image', 'str_name', 'int_price', 'actions'];
  products$: Observable<Product[]>;
  constructor(
    private cartService: CartService
  ) {
    this.products$ = this.cartService.cart$;
  }

  ngOnInit(): void {
  }

  deleteCart(product: Product): void {
    if (confirm('¿Seguro que desea eliminarlo?')) {
      this.cartService.deleteFromCart(product);
    }
  }

}

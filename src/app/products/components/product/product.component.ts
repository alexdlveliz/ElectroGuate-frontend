import { Component, Input, OnInit } from '@angular/core';
import { Product } from './../../../core/models/product.model';
import { CartService } from './../../../core/services/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
  }

  addToCart(): void {
    this.cartService.addCart(this.product);
  }

}

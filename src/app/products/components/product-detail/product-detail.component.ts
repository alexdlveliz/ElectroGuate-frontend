import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/product/product.service';
import { CartService } from '@core/services/cart/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.productService.getOneProduct(id)
      .subscribe(product => {
        this.product = product;
      });
    });
  }

  addToCart(): void {
    this.cartService.addCart(this.product);
  }

}

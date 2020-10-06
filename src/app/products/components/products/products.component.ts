import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../core/services/product/product.service';
import { Product } from './../../../core/models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  value = '';
  brands: string[] = ['Samsung', 'LG', 'Sony'];
  categories: string[] = ['Para la casa', 'Mantenimiento', 'Sonido'];
  products: Product[] = [];

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.allProducts();
  }

  allProducts() {
    this.productService.getAllProducts()
    .subscribe(products => {
      console.log(products);
    });
  }



}

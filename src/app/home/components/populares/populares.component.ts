import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '@core/services/product/product.service';
import { BrandService } from '@core/services/brand/brand.service';
import { CategoryService } from '@core/services/category/category.service';
import { CartService } from '@core/services/cart/cart.service';

import { Product } from '@core/models/product.model';
import { Brand } from '@core/models/brand.model';
import { Category } from '@core/models/category.model';

@Component({
  selector: 'app-populares',
  templateUrl: './populares.component.html',
  styleUrls: ['./populares.component.scss']
})
export class PopularesComponent implements OnInit {

  brands: Brand[] = [];
  categories: Category[] = [];
  products: Product[] = [];

  @Input() product: Product;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  addToCart(): void {
    this.cartService.addCart(this.product);
  }

  async fetchAllProducts() : Promise<void> {
    await this.fetchAllBrands();
    await this.fetchAllCategories();
    await this.productService.getAllProducts()
    .subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }

  fetchAllBrands() : void {
    this.brandService.getBrands()
    .subscribe(brands => {
      this.brands = brands;
    })
  }

  fetchAllCategories(): void {
    this.categoryService.getAllCategories()
    .subscribe(categories => {
      this.categories = categories;
    })
  }

}

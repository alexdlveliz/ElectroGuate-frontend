import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../core/services/product/product.service';
import { BrandService } from './../../../core/services/brand/brand.service';
import { CategoryService } from './../../../core/services/category/category.service';

import { Product } from './../../../core/models/product.model';
import { Brand } from './../../../core/models/brand.model';
import { Category } from './../../../core/models/category.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  value = '';
  brands: string[] = ['Samsung', 'LG', 'Sony'];
  brand: Brand[] = [];
  categories: string[] = ['Para la casa', 'Mantenimiento', 'Sonido'];
  category: Category[] = [];
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.fetchAllProducts();
    this.fetchAllBrands();
    this.fetchAllCategories();
  }

  fetchAllProducts(): void {
    this.productService.getAllProducts()
    .subscribe(products => {
      console.log(products);
    });
  }

  fetchAllBrands(): void {
    this.brandService.getBrands()
    .subscribe(brands => {
      this.brand = brands;
      console.log(this.brand);
    });
  }

  fetchAllCategories(): void {
    this.categoryService.getAllCategories()
    .subscribe(categories => {
      this.category = categories;
      console.log(this.category);
    });
  }



}

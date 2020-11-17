import { Component, OnInit } from '@angular/core';
import { ProductService } from '@core/services/product/product.service';
import { BrandService } from '@core/services/brand/brand.service';
import { CategoryService } from '@core/services/category/category.service';

import { Product } from '@core/models/product.model';
import { Brand } from '@core/models/brand.model';
import { Category } from '@core/models/category.model';
import { MatListOption } from '@angular/material/list';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  value = '';
  brands: Brand[] = [];
  categories: Category[] = [];
  products: Product[] = [];
  brandId = '';
  categoryId = '';

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  async fetchAllProducts(): Promise<void> {
    await this.fetchAllBrands();
    await this.fetchAllCategories();
    await this.productService.getAllProducts('1')
    .subscribe(products => {
      this.products = products;
    });
  }

  fetchAllBrands(): void {
    this.brandService.getBrands()
    .subscribe(brands => {
      this.brands = brands;
      console.log(this.brands);
    });
  }

  fetchAllCategories(): void {
    this.categoryService.getAllCategories()
    .subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  onGroupsChange(brands: MatListOption[]): void {
    if (brands.length > 0) {
      brands.map(brand => {
        this.brandId = brand.value.id;
      });
    } else {
      this.brandId = '';
    }
    this.productService.getAllProducts('1', this.brandId, this.categoryId)
    .subscribe(products => {
      this.products = products;
    });
  }

  onCategoriesChange(categories: MatListOption[]): void {
    if (categories.length > 0) {
      categories.map(category => {
        this.categoryId = category.value.id;
      });
    } else {
      this.categoryId = '';
    }
    this.productService.getAllProducts('1', this.brandId, this.categoryId)
    .subscribe(products => {
      this.products = products;
    });
  }
}

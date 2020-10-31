import { Component, OnInit } from '@angular/core';
import { ProductService } from '@core/services/product/product.service';
import { BrandService } from '@core/services/brand/brand.service';
import { CategoryService } from '@core/services/category/category.service';

import { Product } from '@core/models/product.model';
import { Brand } from '@core/models/brand.model';
import { Category } from '@core/models/category.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  value = '';
  brands: Brand[] = [];
  categories: Category[] = [];
  products: Product[] = [
    {
      id: 1,
      str_name: "algo",
      str_description: "descripción",
      str_product_code: "a2",
      int_amount: 1,
      int_price: 20,
      brand: 1,
      category: 1,
      str_image_link: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    }
    ,
    {
      id: 1,
      str_name: "algo",
      str_description: "descripción",
      str_product_code: "a2",
      int_amount: 1,
      int_price: 20,
      brand: 1,
      category: 1,
      str_image_link: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      id: 1,
      str_name: "algo",
      str_description: "descripción",
      str_product_code: "a2",
      int_amount: 1,
      int_price: 20,
      brand: 1,
      category: 1,
      str_image_link: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      id: 1,
      str_name: "algo",
      str_description: "descripción",
      str_product_code: "a2",
      int_amount: 1,
      int_price: 20,
      brand: 1,
      category: 1,
      str_image_link: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      id: 1,
      str_name: "algo",
      str_description: "descripción",
      str_product_code: "a2",
      int_amount: 1,
      int_price: 20,
      brand: 1,
      category: 1,
      str_image_link: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    }
  ];

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    // this.fetchAllProducts();
  }

  async fetchAllProducts(): Promise<void> {
    await this.fetchAllBrands();
    await this.fetchAllCategories();
    await this.productService.getAllProducts()
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



}

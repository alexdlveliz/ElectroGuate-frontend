import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './../../../core/services/product/product.service';
import { CategoryService } from './../../../core/services/category/category.service';
import { BrandService } from './../../../core/services/brand/brand.service';

import { Product } from './../../../core/models/product.model';
import { Category } from './../../../core/models/category.model';
import { Brand } from './../../../core/models/brand.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  form: FormGroup;
  categories: Category[] = [];
  brands: Brand[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.fetchAllCategories();
    this.fetchAllBrands();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      str_name: ['', Validators.required],
      str_description: ['', Validators.required],
      str_product_code: ['', Validators.required],
      int_amount: ['', Validators.required],
      float_price: ['', Validators.required],
      brand_id: [''],
      category_id: ['']
    });
  }

  createProduct(event: Event): void {
    if (this.form.valid) {
      event.preventDefault();
      console.log(this.form.value);
    }
    // this.productService.createProduct(newProduct)
    // .subscribe(product => {
    //   console.log(product);
    // });
  }

  fetchAllCategories(): void {
    this.categoryService.getAllCategories()
    .subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  fetchAllBrands(): void {
    this.brandService.getBrands()
    .subscribe(brands => {
      this.brands = brands;
      console.log(this.brands);
    });
  }
}

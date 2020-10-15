import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from './../../../core/services/product/product.service';
import { CategoryService } from './../../../core/services/category/category.service';
import { BrandService } from './../../../core/services/brand/brand.service';
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
    private brandService: BrandService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.addNewProduct();
    this.fetchAllCategories();
    this.fetchAllBrands();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      products: this.formBuilder.array([])
    });
  }

  get products(): FormArray {
    return this.form.get('products') as FormArray;
  }

  addNewProduct(): void {
    const product = this.formBuilder.group({
      str_name: new FormControl(''),
      str_description: new FormControl(),
      str_product_code: new FormControl(),
      int_amount: new FormControl(),
      int_price: new FormControl(),
      brand: new FormControl(),
      category: new FormControl()
    });

    this.products.push(product);
  }

  deleteProduct(index: number): void {
    this.products.removeAt(index);
  }

  createProduct(event: Event): void {
    if (this.form.valid) {
      event.preventDefault();
      const products = Object.assign({}, this.form.value);
      const newProducts = products.products;
      for (const newProduct of newProducts) {
        newProduct.brand = newProduct.brand.id;
        newProduct.category = newProduct.category.id;
        console.log(newProduct);
      }
      products.products = newProducts;
      console.log(products);
      this.productService.createProduct(products)
      .subscribe(() => {
        this.router.navigate(['admin/products']);
      });
    }
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

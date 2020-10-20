import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from './../../../core/services/product/product.service';
import { CategoryService } from './../../../core/services/category/category.service';
import { BrandService } from './../../../core/services/brand/brand.service';
import { Category } from './../../../core/models/category.model';
import { Brand } from './../../../core/models/brand.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  categories: Category[] = [];
  brands: Brand[] = [];
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.editForm();
  }

  /**
   * Método para crear el formulario, con todos los elementos input deseados.
   */

  private buildForm(): void {
    this.form = this.formBuilder.group({
      str_name: ['', [Validators.required]],
      str_description: ['', [Validators.required]],
      str_product_code: ['', [Validators.required]],
      int_amount: ['', [Validators.required]],
      int_price: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  /**
   * Método para guardar la edición que se le haga
   * a un producto en específico
   */
  saveProduct(event: Event): void {
    if (this.form.valid) {
      event.preventDefault();
      const products = Object.assign({}, this.form.value);
      console.log(products);
      products.brand = products.brand.id;
      products.category = products.category.id;
      console.log(products);
      this.productService.updateProduct(this.id, products)
      .subscribe(() => {
        this.router.navigate(['admin/products']);
      });
    }
  }

  /**
   * Método para poner en el formulario
   * la información del producto a editar
   */
  async editForm(): Promise<void> {
    await this.fetchAllBrands();
    await this.fetchAllCategories();
    await this.activeRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productService.getOneProduct(this.id)
      .subscribe(product => {
        this.form.patchValue({
          str_name: product.str_name,
          int_price: product.int_price,
          str_product_code: product.str_product_code,
          int_amount: product.int_amount,
          str_description: product.str_description,
          category: this.categories[(product.category) - 1],
          brand: this.brands[(product.brand) - 1]
        });
      });
      }
    );
  }

  /**
   * Método para traer todas las categorías creadas
   */
  fetchAllCategories(): void {
    this.categoryService.getAllCategories()
    .subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  /**
   * Método para traer todas las marcas creadas
   */
  fetchAllBrands(): void {
    this.brandService.getBrands()
    .subscribe(brands => {
      this.brands = brands;
    });
  }
}

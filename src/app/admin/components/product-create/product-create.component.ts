import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';

import { ProductService } from '@core/services/product/product.service';
import { CategoryService } from '@core/services/category/category.service';
import { BrandService } from '@core/services/brand/brand.service';
import { Category } from '@core/models/category.model';
import { Brand } from '@core/models/brand.model';
import { Image } from '@core/models/image.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  contadorForm = 0;
  contadorImages = 0;
  form: FormGroup;
  categories: Category[] = [];
  brands: Brand[] = [];
  image: Image[] = [];
  imageProduct: string;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.addNewProduct();
    this.fetchAllCategories();
    this.fetchAllBrands();
  }

  OnImageChanged(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File): void {
    const observable = new Observable<any>((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((data) => {
      this.image = data;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>): void {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    };
    fileReader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
  /**
   * Método para crear el formulario, con todos los elementos input deseados.
   */

  private buildForm(): void {
    this.form = this.formBuilder.group({
      products: this.formBuilder.array([])
    });
  }

  /**
   * Método para obtener el estado actual del formulario
   */
  // -> employees(): FormArray
  products(): FormArray {
    return this.form.get('products') as FormArray;
  }

  /**
   * Método para agregar dinámicamente los nuevos inputs al formulario.
   */
  // -> newEmployee(): FormGroup
  newProduct(): FormGroup {
    this.contadorForm += 1;
    return this.formBuilder.group({
      str_name: new FormControl('', Validators.required),
      str_description: new FormControl('', Validators.required),
      str_product_code: new FormControl('', Validators.required),
      int_amount: new FormControl('', Validators.required),
      int_price: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      image: new FormControl(''),
      images: new FormArray([])
    });
  }

  // -> addEmployee()
  addNewProduct(): void {
    this.products().push(this.newProduct());
  }

  /**
   * Método para eliminar dinámicamente los inputs del formulario.
   */
  // -> removeEmployee(empIndex: number)
  deleteProduct(index: number): void {
    this.products().removeAt(index);
    this.contadorForm -= 1;
  }

  // employeeSkills(empIndex: number): FormArray
  productImages(productIndex: number): FormArray {
    return this.products().at(productIndex).get('images') as FormArray;
  }

  // newSkill(): FormGroup
  newImage(): FormGroup {
    return this.formBuilder.group({
      image: ''
    });
  }

  // addEmployeeSkill(empIndex: number)
  addProductImages(productIndex: number): void {
    this.productImages(productIndex).push(this.newImage());
  }

  // removeEmployeeSkill(empIndex: number, skillIndex: number)
  removeProductImages(productIndex: number, imageIndex: number): void {
    this.productImages(productIndex).removeAt(imageIndex);
  }

  /**
   * Método para tomar los datos que están en el formulario, trabajar con los datos,
   * y por último llamar al servicio requerido e insertar los datos en la API.
   */
  createProduct(event: Event): void {
    if (this.form.valid) {
      event.preventDefault();
      const products = Object.assign({}, this.form.value);
      console.log('**********************');
      console.log(products);
      console.log('----------------------');
      const newProducts = products.products;
      console.log(newProducts);
      // for (const newProduct of newProducts) {
      //   newProduct.brand = newProduct.brand.id;
      //   newProduct.category = newProduct.category.id;
      //   newProduct.images = [
      //     {
      //       url_image: this.image
      //     }
      //   ];
      //   const key = 'image';
      //   delete newProduct[key];
      // }
      // products.products = newProducts;
      // console.log(products);
      // this.productService.createProduct(products)
      // .subscribe(() => {
      //   this.router.navigate(['admin/products']);
      // });
    }
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
      console.log(this.brands);
    });
  }
}

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

  imagesProduct = new Map();
  contadorForm = 0;
  contadorImages = 0;
  form: FormGroup;
  categories: Category[] = [];
  brands: Brand[] = [];
  image: Image[] = [];

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

  /**
   * Método para detectar cuando se agregue una imagen al input tipo file
   */
  OnImageChanged(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.convertToBase64(file);
  }

  /**
   * Método para agregar al array de imágenes, las imágenes
   * convertidas a base64
   */
  convertToBase64(file: File): void {
    const observable = new Observable<any>((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((data) => {
      this.image.push({
        url_image: data
      });
      this.imagesProduct.set(this.contadorForm, this.image);
    });
  }

  /**
   * Método para convertir el file a un texto base64
   */
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
  products(): FormArray {
    return this.form.get('products') as FormArray;
  }

  /**
   * Método para agregar dinámicamente los nuevos inputs al formulario.
   */
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

  /**
   * Método para tomar los datos que están en el formulario, trabajar con los datos,
   * y por último llamar al servicio requerido e insertar los datos en la API.
   */
  createProduct(event: Event): void {
    if (this.form.valid) {
      event.preventDefault();
      const products = Object.assign({}, this.form.value);
      const newProducts = products.products;
      let contador = 1;
      for (const newProduct of newProducts) {
        newProduct.brand = newProduct.brand.id;
        newProduct.category = newProduct.category.id;
        console.log(this.imagesProduct);
        newProduct.images = this.imagesProduct.get(contador);
        const key = 'image';
        delete newProduct[key];
        contador += 1;
      }
      products.products = newProducts;
      console.log(products);
      this.productService.createProduct(products)
      .subscribe(() => {
        this.router.navigate(['admin/products']);
      });
    }
  }

  /**
   * Método para agregar dinámicamente formularios para productos
   */
  addNewProduct(): void {
    if (this.contadorForm < 5) {
      this.image = [];
      this.products().push(this.newProduct());
    } else {
      alert('No se pueden crear más de 5 productos a la vez');
    }
  }

  /**
   * Método para eliminar dinámicamente los inputs del formulario.
   */
  deleteProduct(index: number): void {
    this.products().removeAt(index);
    this.contadorForm -= 1;
  }

  /**
   * Método para acceder al formArray images, dentro del formulario principal
   */
  productImages(productIndex: number): FormArray {
    return this.products().at(productIndex).get('images') as FormArray;
  }

  /**
   * Método para crear el formulario para las imágenes
   */
  newImage(): FormGroup {
    this.contadorImages += 1;
    return this.formBuilder.group({
      url_image: ''
    });
  }

  /**
   * Método para agregar más campos de imágenes a los productos
   */
  addProductImages(productIndex: number): void {
    if (this.getImagesByProduct(productIndex) < 3) {
      this.productImages(productIndex).push(this.newImage());
    } else {
      alert('Solamente son 3 imágenes por producto');
    }
  }

  /**
   * Método para eliminar los campos de imágenes para los productos
   */
  removeProductImages(productIndex: number, imageIndex: number): void {
    this.contadorImages -= 1;
    this.productImages(productIndex).removeAt(imageIndex);
  }

  /**
   * Método para saber cuántas imágenes tiene cada producto
   */
  getImagesByProduct(productIndex: number): number {
    return this.productImages(productIndex).length;
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

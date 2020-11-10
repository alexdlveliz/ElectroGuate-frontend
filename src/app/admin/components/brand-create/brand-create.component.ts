import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BrandService } from '@core/services/brand/brand.service';
import { CategoryService } from '@core/services/category/category.service';
import { Category } from '@core/models/category.model';
import { Observable, Subscriber } from 'rxjs';
@Component({
  selector: 'app-brand-create',
  templateUrl: './brand-create.component.html',
  styleUrls: ['./brand-create.component.scss']
})
export class BrandCreateComponent implements OnInit {

  form: FormGroup;
  categories: Category[] = [];
  id: number;
  image: Observable<string>;

  constructor(
    private brandService: BrandService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.editForm();
  }

  /**
   * Método para crear el formulario.
   * Se utilizaron formularios reactivos
   */
  private buildForm(): void {
    this.form = this.formBuilder.group({
      str_name: ['', Validators.required],
      str_description: ['', Validators.required],
      category: ['', Validators.required],
      url_image: ['', [Validators.required]]
    });
  }

  onChange(event: Event): void {
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
   * Método para obtener todas las categorías,
   * y poder mostrarlas al momento de asociar
   * la marca a crear con una categoría
   */
  fetchAllCategories(): void {
    this.categoryService.getAllCategories()
    .subscribe(categories => {
      this.categories = categories;
    });
  }

  /**
   * Método para guardar la marca en la BD,
   * llamado al método correspondiente de la API,
   * utilizando el brandService
   */
  saveBrand(event: Event): void {
    if (this.form.valid) {
      event.preventDefault();
      if (this.id === undefined) {
        const copia = Object.assign({}, this.form.value);
        copia.category = this.form.controls.category.value.id;
        copia.url_image = this.image;
        this.brandService.createBrand(copia)
        .subscribe(() => {
          this.router.navigate(['/admin/brands']);
        });
      } else {
        const copia = Object.assign({}, this.form.value);
        copia.category = this.form.controls.category.value.id;
        this.brandService.updateBrand(this.id, copia)
        .subscribe(() => {
          this.router.navigate(['/admin/brands']);
        });
      }
    }
  }

  /**
   * Este método tiene dos funcionalidades:
   *  Verifica si lo que se está haciendo es un crear una categoría
   *  o editándo una.
   *  Colocar la información deseada si lo que se está haciendo
   *  es la edición de una categoría en el formulario
   */
  async editForm(): Promise<void> {
    await this.fetchAllCategories();
    await this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      if (this.id !== undefined) {
        this.brandService.getOneBrand(this.id)
        .subscribe(brand => {
          this.form.patchValue({
            str_name: brand.str_name,
            str_description: brand.str_description,
            category: this.categories[(brand.category) - 1]
          });
        });
      }
    });
  }

  /**
   * getters para los valores del formulario
   */
  get strName(): AbstractControl {
    return this.form.get('str_name');
  }

  get strDescription(): AbstractControl {
    return this.form.get('str_description');
  }

  get category(): AbstractControl {
    return this.form.get('category');
  }

  get urlImage(): AbstractControl {
    return this.form.get('url_image');
  }
}

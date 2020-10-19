import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BrandService } from './../../../core/services/brand/brand.service';
import { CategoryService } from './../../../core/services/category/category.service';
import { Category } from './../../../core/models/category.model';
@Component({
  selector: 'app-brand-create',
  templateUrl: './brand-create.component.html',
  styleUrls: ['./brand-create.component.scss']
})
export class BrandCreateComponent implements OnInit {

  form: FormGroup;
  categories: Category[] = [];
  id: number;

  constructor(
    private brandService: BrandService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.fetchAllCategories();
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
      category_id: ['', Validators.required]
    });
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
      const copia = Object.assign({}, this.form.value);
      copia.category_id = this.form.controls.category_id.value.id;
      this.brandService.createBrand(copia)
      .subscribe(() => {
        this.router.navigate(['/admin/brands']);
      });
    }
  }

  /**
   * Este método tiene dos funcionalidades:
   *  Verifica si lo que se está haciendo es un crear una categoría
   *  o editándo una.
   *  Colocar la información deseada si lo que se está haciendo
   *  es la edición de una categoría en el formulario
   */
  editForm(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      if (this.id !== undefined) {
        this.brandService.getOneBrand(this.id)
        .subscribe(brand => {
          console.log(brand);
          this.form.patchValue(brand);
        });
      }
    });
  }
}

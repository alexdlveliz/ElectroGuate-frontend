import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BrandService } from '@core/services/brand/brand.service';
import { CategoryService } from '@core/services/category/category.service';
import { Category } from '@core/models/category.model';
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
      category: ['', Validators.required]
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
      if (this.id === undefined) {
        const copia = Object.assign({}, this.form.value);
        copia.category = this.form.controls.category.value.id;
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
}

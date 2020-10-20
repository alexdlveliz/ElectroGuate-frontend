import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from './../../../core/services/category/category.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  form: FormGroup;
  id: number;
  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.editForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      str_name: ['', [Validators.required]],
      str_description: ['', Validators.required],
      str_image_path: ['']
    });
  }

  /**
   * Este método se encarga de llamar a dos diferentes métodos,
   * dependiendo de lo que se esté haciendo.
   * Si se está editando se llama al método para actualizar,
   * si se está creando la categoría, se llama al método
   * para la creación
   */
  saveCategory(event: Event): void {
    if (this.form.valid) {
      event.preventDefault();
      console.log(this.form.value);
      /**
       * Condición para verificar si la categoría se está
       * creando o se está editando.
       * Si this.id === undefined, significa que la categoría
       * se está creando, de lo contrario, se está editando
       */
      if (this.id === undefined) {
        this.categoryService.createCategory(this.form.value)
        .subscribe(() => {
          this.router.navigate(['/admin/categories']);
        });
      } else {
        this.categoryService.updateCategory(this.id, this.form.value)
        .subscribe(() => {
          this.router.navigate(['/admin/categories']);
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
  editForm(): void {
    this.activedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      if (this.id !== undefined) {
        this.categoryService.getOneCategory(this.id).
        subscribe(category => {
          this.form.patchValue(category);
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '@core/services/category/category.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  form: FormGroup;
  id: number;
  image: Observable<string>;
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
      url_image: ['']
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
   * Este método se encarga de llamar a dos diferentes métodos,
   * dependiendo de lo que se esté haciendo.
   * Si se está editando se llama al método para actualizar,
   * si se está creando la categoría, se llama al método
   * para la creación
   */
  saveCategory(event: Event): void {
    if (this.form.valid) {
      event.preventDefault();
      /**
       * Condición para verificar si la categoría se está
       * creando o se está editando.
       * Si this.id === undefined, significa que la categoría
       * se está creando, de lo contrario, se está editando
       */
      if (this.id === undefined) {
        const newCategory = Object.assign({}, this.form.value);
        newCategory.url_image = this.image;
        this.categoryService.createCategory(newCategory)
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from './../../../core/services/category/category.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  form: FormGroup;
  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      str_name: ['', [Validators.required]],
      str_description: ['', Validators.required],
      str_image_path: ['']
    });
  }

  createCategory(event: Event): void {
    if (this.form.valid) {
      event.preventDefault();
      this.categoryService.createCategory(this.form.value)
      .subscribe(() => {
        this.router.navigate(['/admin/categories']);
      });
    }
  }
}

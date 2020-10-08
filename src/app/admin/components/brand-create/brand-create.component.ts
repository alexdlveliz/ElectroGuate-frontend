import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from './../../../core/services/brand/brand.service';
import { CategoryService } from './../../../core/services/category/category.service';
import { Brand } from './../../../core/models/brand.model';
import { Category } from './../../../core/models/category.model';
@Component({
  selector: 'app-brand-create',
  templateUrl: './brand-create.component.html',
  styleUrls: ['./brand-create.component.scss']
})
export class BrandCreateComponent implements OnInit {

  form: FormGroup;
  categories: Category[] = [];

  constructor(
    private brandService: BrandService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.fetchAllCategories();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      str_name: ['', Validators.required],
      category_id: ['']
    });
  }

  fetchAllCategories(): void {
    this.categoryService.getAllCategories()
    .subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  createBrand(event: Event): void {
    if (this.form.valid) {
      event.preventDefault();
      console.log(this.form.value);
    }
  }
}

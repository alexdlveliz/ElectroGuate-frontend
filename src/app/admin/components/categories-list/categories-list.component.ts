import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@core/services/category/category.service';
import { Category } from '@core/models/category.model';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'str_name', 'str_description', 'actions'];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.fetchAllCategories();
  }

  fetchAllCategories(): void {
    this.categoryService.getAllCategories()
    .subscribe(categories => {
      this.categories = categories;
    });
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro?')) {
      this.categoryService.deleteCategory(id)
      .subscribe(() => {
        this.fetchAllCategories();
      });
    }
  }
}

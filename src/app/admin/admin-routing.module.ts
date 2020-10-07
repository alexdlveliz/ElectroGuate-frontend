import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsListComponent } from './components/brands-list/brands-list.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/create',
        component: ProductCreateComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'brands',
        component: BrandsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

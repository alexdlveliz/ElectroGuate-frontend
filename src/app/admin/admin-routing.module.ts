import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandCreateComponent } from './components/brand-create/brand-create.component';
import { BrandsListComponent } from './components/brands-list/brands-list.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      /**
       * Routing para los productos
       */
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/create',
        component: ProductCreateComponent
      },
      {
        path: 'products/edit/:id',
        component: ProductEditComponent
      },
      /**
       * Routing para las categorías
       */
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'categories/create',
        component: CategoryCreateComponent
      },
      {
        path: 'categories/edit/:id',
        component: CategoryCreateComponent
      },
      /**
       * Routing para las marcas
       */
      {
        path: 'brands',
        component: BrandsListComponent
      },
      {
        path: 'brands/create',
        component: BrandCreateComponent
      },
      {
        path: 'brands/edit/:id',
        component: BrandCreateComponent
      },
      /**
       * Routing para los usuarios
       */
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'users/edit/:id',
        component: UserEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

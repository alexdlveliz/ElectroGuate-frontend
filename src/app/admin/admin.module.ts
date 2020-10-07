import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { BrandsListComponent } from './components/brands-list/brands-list.component';


@NgModule({
  declarations: [NavComponent, ProductCreateComponent, ProductsListComponent, CategoriesListComponent, BrandsListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from "../material/material.module";
import { ProductsService } from "../core/services/products/products.service";


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    MaterialModule
  ],
  providers: [ProductsService]
})
export class ProductsModule { }

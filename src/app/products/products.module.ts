import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@material/material.module';
import { ProductService } from '@core/services/product/product.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductComponent } from './components/product/product.component';


@NgModule({
  declarations: [ProductsComponent, ProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [ProductService]
})
export class ProductsModule { }

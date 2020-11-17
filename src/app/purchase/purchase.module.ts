import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material/material.module';

@NgModule({
  declarations: [OrderComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class PurchaseModule { }

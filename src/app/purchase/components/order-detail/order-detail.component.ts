import { Component, OnInit } from '@angular/core';
import { OrderDetail } from '@core/models/order-detail.model';
import { PurchaseService } from '@core/services/purchase/purchase.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderDetails: OrderDetail[] = [];
  constructor(
    private purchaseService: PurchaseService
  ) { }

  ngOnInit(): void {
  }

  getDetailOrder(orderId): void {
    this.purchaseService.getDetailOrders(orderId)
    .subscribe(orderDetails => {
      this.orderDetails = orderDetails;
      console.log(orderDetails);
    });
  }
}

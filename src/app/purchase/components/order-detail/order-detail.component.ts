import { Component, OnInit } from '@angular/core';
import { OrderDetail } from '@core/models/order-detail.model';
import { PurchaseService } from '@core/services/purchase/purchase.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderDetails: OrderDetail[] = [];
  orderId;
  constructor(
    private purchaseService: PurchaseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.orderId = params.id;
      this.getDetailOrder(this.orderId);
    });
  }

  getDetailOrder(orderId): void {
    this.purchaseService.getDetailOrders(orderId)
    .subscribe(orderDetails => {
      this.orderDetails = orderDetails;
      console.log(orderDetails);
    });
  }
}

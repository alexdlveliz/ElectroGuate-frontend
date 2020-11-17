import { Component, OnInit } from '@angular/core';
import { Order } from '@core/models/order.model';
import { PurchaseService } from '@core/services/purchase/purchase.service';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  userId;
  orders: Order[] = [];
  displayedColumns: string[] = ['id', 'created_at', 'total', 'actions'];

  constructor(
    private purchaseService: PurchaseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserId();
    this.purchaseService.getOrderByUserId(this.userId)
    .subscribe(orders => {
      this.orders = orders;
    });
  }

  getUserId(): void {
    this.userId = this.authService.getUserId();
  }

}

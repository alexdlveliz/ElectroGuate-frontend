import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders = [
    {
      "id": 1,
      "is_deleted": false,
      "deleted_at": null,
      "created_at": "2020-11-17T00:14:09Z",
      "modified_at": "2020-11-17T00:14:09Z",
      "paypal_order_id": "1231235",
      "total": "100.00",
      "zip_code": "123",
      "details": "12313.",
      "user": 1
    }
  ]
  displayedColumns: string[] = ['id', 'created_at', 'total', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

}

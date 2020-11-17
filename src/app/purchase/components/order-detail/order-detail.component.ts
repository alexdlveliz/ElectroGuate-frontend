import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  details = [
    {
      "id": 1,
      "product": {
        "str_name": "12312",
        "str_description": "asdasdas",
        "str_product_code": "qweqweq",
        "images": []
      },
      "order": {
        "id": 1,
        "created_at": "2020-11-17T00:14:09Z",
        "user": {
          "id": 1,
          "str_name": "string",
          "str_surname": "string",
          "str_email": "correo1@admin.com",
          "str_role": "admin",
          "str_phone_number": "12345678"
        },
        "paypal_order_id": "1231235",
        "total": "100.00",
        "zip_code": "123",
        "details": "12313."
      },
      "amount": 15,
      "price": "10.00"
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

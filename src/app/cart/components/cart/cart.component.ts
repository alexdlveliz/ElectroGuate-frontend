import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products = [{name: 'producto 1', desc: 'Descripción 1', price: 500.32},
  {name: 'producto 2', desc: 'Descripción 2', price: 1500.00}];
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  value = "";
  brands: string[] = ['Samsung', 'LG', 'Sony'];
  categories: string[] = ['Para la casa', 'Mantenimiento', 'Sonido'];
  constructor() { }

  ngOnInit(): void {
  }

}

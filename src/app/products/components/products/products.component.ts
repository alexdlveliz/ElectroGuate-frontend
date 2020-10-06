import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  value = "";
  brands: string[] = ['Samsung', 'LG', 'Sony'];
  categories: string[] = ['Para la casa', 'Mantenimiento', 'Sonido'];
  public products = [];
  
  constructor(private _productsService: ProductsService) { }

  ngOnInit(): void {
    this.products = this._productsService.getProducts();
  }

}

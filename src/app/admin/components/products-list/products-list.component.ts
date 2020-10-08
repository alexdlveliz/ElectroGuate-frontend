import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../core/services/product/product.service';
import { Product } from './../../../core/models/product.model';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['id', 'str_name', 'str_product_code', 'str_description', 'int_amount', 'int_price', 'actions'];
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  fetchAllProducts(): void {
    this.productService.getAllProducts()
    .subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id)
    .subscribe(() => {
      this.fetchAllProducts();
    });
  }

}

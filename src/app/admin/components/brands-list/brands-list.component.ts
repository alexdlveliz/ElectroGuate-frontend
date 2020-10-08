import { Component, OnInit } from '@angular/core';
import { Brand } from './../../../core/models/brand.model';
import { BrandService } from './../../../core/services/brand/brand.service';
@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent implements OnInit {

  brands: Brand[] = [];
  displayedColumns: string[] = ['id', 'str_name', 'str_description', 'actions'];

  constructor(
    private brandService: BrandService,
  ) { }

  ngOnInit(): void {
    this.fetchAllBrands();
  }

  fetchAllBrands(): void {
    this.brandService.getBrands()
    .subscribe(brands => {
      this.brands = brands;
    });
  }

  deleteBrand(id: number): void {
    this.brandService.deleteBrand(id)
    .subscribe(() => {
      this.fetchAllBrands();
    });
  }

}

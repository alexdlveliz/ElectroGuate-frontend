import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '@core/models/product.model';
import { CartService } from '@core/services/cart/cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['image', 'str_name', 'int_price', 'actions'];
  contador = 0;
  departmentsMap = new Map();
  departaments = [
    'GUATEMALA', 'EL PROGRESO', 'SACATEPEQUEZ', 'CHIMALTENANGO', 'ESCUINTLA', 'SANTA ROSA', 'SOLOLA', 'TOTONICAPAN', 'QUETZALTENANGO', 'SUCHITEPEQUEZ', 'RETALHULEU', 'SAN MARCOS', 'HUEHUETENANGO', 'QUICHE', 'BAJA VERAPAZ', 'ALTA VERAPAZ', 'PETEN', 'IZABAL', 'ZACAPA', 'CHIQUIMULA', 'JALAPA', 'JUTIAPA'
  ];
  items$: Observable<Map<Product, number>>;
  listItems: Map<Product, number>;
  form: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.setItems();
    this.setDepartmentMap();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private setDepartmentMap(): void {
    for (const department of this.departaments) {
      this.departmentsMap.set(this.contador, department);
      this.contador += 1;
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      str_name: ['', [Validators.required]],
      department: ['', [Validators.required]],
      str_address_1: ['', [Validators.required]],
      str_address_2: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      str_description: ['', [Validators.required]]
    });
  }

  setItems(): void {
    this.items$ = this.cartService.cart$.pipe(
      map(products => {
        this.listItems = new Map();
        products.forEach(product => {
          let count = 1;
          if (this.listItems.has(product)) {
            count = this.listItems.get(product) + 1;
          }
          this.listItems.set(product, count);
        });
        return this.listItems;
      })
    );
  }

  addItem(product: Product): void {
    const value = this.listItems.get(product);
    this.listItems.set(product, value + 1);
    this.cartService.addCart(product);
    this.setItems();
  }

  deleteItem(product: Product): void {
    const value = this.listItems.get(product);
    this.listItems.set(product, value - 1);
    if (value - 1 === 0) {
      this.cartService.deleteFromCart(product);
      this.setItems();
    } else {
      this.cartService.deleteItem(product);
    }
  }

  deleteProduct(product: Product): void {
    if (confirm('¿Seguro que desea eliminarlo?')) {
      this.cartService.deleteFromCart(product);
    }
  }

  get strName(): AbstractControl {
    return this.form.get('str_name');
  }

  get department(): AbstractControl {
    return this.form.get('department');
  }

  get strAddress1(): AbstractControl {
    return this.form.get('str_address_1');
  }

  get strAddress2(): AbstractControl {
    return this.form.get('str_address_2');
  }

  get postalCode(): AbstractControl {
    return this.form.get('postal_code');
  }

  get phoneNumber(): AbstractControl {
    return this.form.get('phone_number');
  }

  get strDescription(): AbstractControl {
    return this.form.get('str_description');
  }

}

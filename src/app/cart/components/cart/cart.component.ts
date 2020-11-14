import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '@core/models/product.model';
import { CartService } from '@core/services/cart/cart.service';
import { AuthService } from '@core/services/auth/auth.service';
import { map } from 'rxjs/operators';

declare var paypal;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  producto = {
    descripcion: 'producto en venta',
    precio: 1.99,
    image: 'imagen del producto'
  };
  displayedColumns: string[] = ['image', 'str_name', 'int_price', 'actions'];
  contador = 0;
  departmentsMap = new Map();
  departaments = [
    'GUATEMALA', 'EL PROGRESO', 'SACATEPEQUEZ', 'CHIMALTENANGO', 'ESCUINTLA', 'SANTA ROSA', 'SOLOLA', 'TOTONICAPAN', 'QUETZALTENANGO', 'SUCHITEPEQUEZ', 'RETALHULEU', 'SAN MARCOS', 'HUEHUETENANGO', 'QUICHE', 'BAJA VERAPAZ', 'ALTA VERAPAZ', 'PETEN', 'IZABAL', 'ZACAPA', 'CHIQUIMULA', 'JALAPA', 'JUTIAPA'
  ];
  items$: Observable<Map<Product, number>>;
  listItems: Map<Product, number>;
  form: FormGroup;
  formPayment: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.setItems();
    this.setDepartmentMap();
  }

  ngOnInit(): void {
    this.buildForm();
    paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.producto.descripcion,
              amount: {
                currency_code: 'USD',
                value: this.producto.precio
              }
            }
          ]
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);
      },
      onError: err => {
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);
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
      str_principal_address: ['', [Validators.required]],
      str_secundary_address: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      str_description: ['', [Validators.required]]
    });
  }

  private buildFormPayment(): void {
    this.formPayment = this.formBuilder.group({
      str_card_number: ['', [Validators.required]],
      card_date: ['', [Validators.required]],
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

  get strPrincipalAddress(): AbstractControl {
    return this.form.get('str_principal_address');
  }

  get strSecundaryAddress(): AbstractControl {
    return this.form.get('str_secundary_address');
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

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Product } from '@core/models/product.model';
import { Order } from '@core/models/order.model';
import { OrderDetail } from '@core/models/order-detail.model';
import { CartService } from '@core/services/cart/cart.service';
import { AuthService } from '@core/services/auth/auth.service';
import { OrderService } from '@core/services/order/order.service';
import { OrderDetailService } from '@core/services/orderDetail/order-detail.service';
import { PaymentsService } from '@core/services/payment/payment.service';
import { Payment } from '@core/models/payment.model';
import { User } from '@core/models/user.model';
import { UserService } from '@core/services/user/user.service';
import { LoaderService } from '@core/services/loader/loader.service';

declare var paypal;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  /**
   * Variable para guardar el total de la compra,
   * que se utilizará en el método createOrder de paypal
   */
  totalBuying = 0;
  /**
   * Variable para almacenar el objeto order,
   * que es el que se le mandará al servicio de Order
   */
  order: Order;

  orderDetails;
  orderId;
  orderDetail: OrderDetail;
  payment: Payment;
  user: User;
  userId;
  paypalPayerId;
  nextButton = false;

  displayedColumns: string[] = ['image', 'str_name', 'int_price', 'actions'];
  contador = 0;
  items$: Observable<Map<Product, number>>;
  listItems: Map<Product, number>;
  form: FormGroup;
  formPayment: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private router: Router,
    private paymentService: PaymentsService,
    private userService: UserService,
    public loaderService: LoaderService
  ) {
    this.setItems();
  }

  ngOnInit(): void {
    this.buildForm();
    this.payPal();
    this.getUser();
  }

  async getUser(): Promise<void> {
    this.userId = this.authService.getUserId();
    this.user =  await this.userService.getOneUser(this.userId).toPromise();
  }

  putShippingInfo(): void {
    this.form.patchValue({
      str_name: this.user.str_name,
      str_principal_address: this.user.str_principal_address,
      str_secundary_address: this.user.str_secundary_address,
      phone_number: this.user.str_phone_number
    });
  }
  private payPal(): void {
    paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: `En la compra de ${this.listItems.size} productos`,
              amount: {
                currency_code: 'USD',
                value: this.convertCurrency()
              }
            }
          ]
        });
      },
      onApprove: (data, actions) => {
        actions.order.capture().then((details) => {
          const orderId = details.id;
          this.paypalPayerId = data.payerID;
          this.createOrder(orderId);
        });
      },
      onError: err => {
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);
  }

  getTotalBuying(): number {
    for (const [key, value] of this.listItems.entries()) {
      this.totalBuying += key.int_price * value;
    }
    console.log(this.totalBuying);
    return Number((this.totalBuying * 0.128564).toFixed(2));
  }
  private convertCurrency(): number {
    return this.getTotalBuying();
  }

  async createOrder(orderId): Promise<any> {
    const formCopy = Object.assign({}, this.form.value);
    // this.userId = this.authService.getUserId(),
    this.order = {
      zip_code: formCopy.zip_code,
      details: formCopy.details,
      user: this.userId,
      paypal_order_id: orderId,
      total: 0
    };
    this.orderId = await this.orderService.createOrder(this.order).toPromise();
    this.orderId = this.orderId.id;
    for (const [key, value] of this.listItems.entries()) {
      this.orderDetail = {
        amount: value,
        order: this.orderId,
        price: key.int_price,
        product: key.id
      };
      this.orderDetailService.createOrderDetails(this.orderDetail).toPromise();
    }
    // this.user = await this.userService.getOneUser(this.userId).toPromise();
    this.payment = {
      order: this.orderId,
      user: this.userId,
      str_name: this.user.str_name,
      str_card_number: this.paypalPayerId,
    };
    this.paymentService.createPayment(this.payment)
    .subscribe(() => {
      alert('Compra realizada correctamente');
      this.cartService.clearCart();
      this.router.navigate(['/']);
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      str_name: ['', [Validators.required]],
      str_principal_address: ['', [Validators.required]],
      str_secundary_address: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      details: ['', [Validators.required]]
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
        this.toggleNextButton();
        return this.listItems;
      })
    );
  }

  addItem(product: Product): void {
    const value = this.listItems.get(product);
    this.listItems.set(product, value + 1);
    this.cartService.addCart(product);
    this.setItems();
    this.toggleNextButton();
  }

  deleteItem(product: Product): void {
    this.toggleNextButton();
    const value = this.listItems.get(product);
    this.listItems.set(product, value - 1);
    if (value - 1 === 0) {
      this.cartService.deleteFromCart(product);
      this.setItems();
    } else {
      this.cartService.deleteItem(product);
    }
  }

  /**
   * Método para eliminar por completo un producto de la compra
   */
  deleteProduct(product: Product): void {
    if (confirm('¿Seguro que desea eliminarlo?')) {
      this.cartService.deleteFromCart(product);
    }
  }

  /**
   * Método para pasar al siguiente 'step' del flujo de la compra
   */
  toggleNextButton(): void {
    this.listItems.size === 0 ? this.nextButton = false : this.nextButton = true;
    console.log(this.nextButton);
  }

  /**
   * Métodos getters para los valores del formulario
   */
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

  get zipCode(): AbstractControl {
    return this.form.get('zip_code');
  }

  get phoneNumber(): AbstractControl {
    return this.form.get('phone_number');
  }

  get details(): AbstractControl {
    return this.form.get('details');
  }

}

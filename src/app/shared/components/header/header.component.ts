import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { AuthService } from '@core/services/auth/auth.service';
import { CartService } from '@core/services/cart/cart.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  total$: Observable<number>;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.total$ = this.cartService.cart$
    .pipe(
      map(products => products.length)
    );
  }

  ngOnInit(): void {
  }

  /**
   * Método para cerrar sesión
   */
  logOut(): void {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

  /**
   * Método para verificar si la persona ha iniciado sesión,
   * llamando al servicio correspondiente
   */
  userExists(): string {
    return this.authService.getLocalStorage();
  }

  /**
   * Método para conocer el rol de quien haya iniciado sesión,
   * llamando al servicio correspondiente
   */
  userRole(): string {
    return this.authService.getUserRole();
  }

}

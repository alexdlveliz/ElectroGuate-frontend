import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CartService } from './../../../core/services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  total = 0;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.cartService.cart$.subscribe(products => {
      console.log(products);
      this.total = products.length;
    });
  }

  ngOnInit(): void {
    // console.log(localStorage.getItem('usuario'));
  }

  logOut(): void {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

  userExists(): string {
    return this.authService.getLocalStorage();
  }

  userRole(): string {
    return this.authService.getUserRole();
  }

}

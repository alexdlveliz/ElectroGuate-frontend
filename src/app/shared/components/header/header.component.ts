import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log(localStorage.getItem('usuario'));
  }

  logOut(): void {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

  userExists(): string {
    return this.userService.userExists();
  }

  userRole(): string {
    return this.tokenService.getUserRole();
  }

}

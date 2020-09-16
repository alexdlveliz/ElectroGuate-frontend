import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('token'));
  }

  logOut(): void {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

  userExists(): string {
    return this.userService.userExists();
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = ['id', 'str_name', 'str_surname', 'str_email', 'str_phone_number', 'str_role', 'actions'];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from './../../../core/services/user/user.service';

interface Role {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})


export class UserEditComponent implements OnInit {

  id: number;
  roles: Role[] = [
    { value: 0, viewValue: 'admin' },
    { value: 1, viewValue: 'usuario' },
  ];
  form: FormGroup;
  isActive: string;
  isDeleted: string;
  deletedAt: string;
  role: Role;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private userService: UserService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.editForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      str_name: ['', [Validators.required]],
      str_surname: ['', [Validators.required]],
      str_email: ['', [Validators.required]],
      str_role: ['', [Validators.required]],
      str_phone_number: ['', [Validators.required]],
      is_active: [{value: '', disabled: true}, [Validators.required]],
      created_at: [{value: '', disabled: true}],
      modified_at: [{value: '', disabled: true}],
      is_deleted: [{value: '', disabled: true}],
      deleted_at: [{value: '', disabled: true}]
    });
  }


  editForm(): void {
    this.activatedRouter.params.subscribe((params: Params) => {
      this.id = params.id;
      this.userService.getOneUser(this.id)
      .subscribe(user => {
        console.log(user);
        user.is_active ? this.isActive = 'Sí' : this.isActive = 'No';
        user.is_deleted ? this.isDeleted = 'Sí' : this.isDeleted = 'No';
        user.deleted_at === null ? this.deletedAt = 'Nunca' : this.deletedAt = user.deleted_at;
        this.role = this.roles.find((role) => {
          return role.viewValue === user.str_role;
        });
        this.form.patchValue({
          str_name: user.str_name,
          str_surname: user.str_surname,
          str_email: user.str_email,
          str_phone_number: user.str_phone_number,
          str_role: this.roles[this.role.value],
          is_active: this.isActive,
          created_at: user.created_at,
          modified_at: user.modified_at,
          is_deleted: this.isDeleted,
          deleted_at: this.deletedAt
        });
      });
    });
  }

  saveUser(event: Event): void {
    if (this.form.valid) {
      event.preventDefault();
      console.log(this.form.value);
      const newUser = Object.assign({}, this.form.value);
      newUser.str_role = newUser.str_role.value;
      console.log(newUser);
      this.userService.updateUser(this.id, newUser)
      .subscribe(() => {
        this.router.navigate(['admin/users']);
      });
    }
  }
}

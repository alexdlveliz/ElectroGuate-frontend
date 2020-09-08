import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  formSignin: FormGroup;

  signin = true;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.buildLoginForm();
    this.buildSigninForm();
  }

  ngOnInit(): void {
  }

  // Función para iniciar sesión
  login(event: Event): void {
    event.preventDefault();
    // console.log(this.formLogin.value);
    this.userService.getUsers()
      .subscribe(users => {
        console.log(users);
      });
  }

  // Función para crear usuario
  signIn(event: Event): void {
    event.preventDefault();
    console.log(this.formSignin.value);
    this.userService.signIn(this.formSignin.value)
      .subscribe(user => {
        console.log(`el user a crear es: ${user}`);
      });
  }

  private buildLoginForm(): void {
    this.formLogin = this.formBuilder.group({
      userLogin: ['', [Validators.required]],
      emailLogin: ['', [Validators.required, Validators.email]]
    });
  }

  private buildSigninForm(): void {
    this.formSignin = this.formBuilder.group({
      str_name: ['', [Validators.required]],
      str_surname: ['', [Validators.required]],
      str_email: ['', [Validators.required, Validators.email]],
      str_phone_number: ['', [Validators.required]],
      str_role: ['0', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) {
    this.buildLoginForm();
    this.buildSigninForm();
  }

  ngOnInit(): void {
  }

  // Función para iniciar sesión
  login(event: Event): void {
    event.preventDefault();
    console.log(this.formLogin.value);
  }

  // Función para crear usuario
  signIn(event: Event): void {
    event.preventDefault();
    console.log(this.formSignin.value);
  }

  private buildLoginForm(): void {
    this.formLogin = this.formBuilder.group({
      userLogin: ['', [Validators.required]],
      emailLogin: ['', [Validators.required, Validators.email]]
    });
  }

  private buildSigninForm(): void {
    this.formSignin = this.formBuilder.group({
      nameSignin: ['', [Validators.required]],
      userSignin: ['', [Validators.required]],
      emailSignin: ['', [Validators.required, Validators.email]],
      passwordSignin: ['', [Validators.required]],
      confirmationPassword: ['', [Validators.required]]
    });
  }
}

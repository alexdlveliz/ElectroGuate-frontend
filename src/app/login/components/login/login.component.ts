import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../core/services/user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.buildLoginForm();
    this.buildSigninForm();
  }

  ngOnInit(): void {
  }

  // Función para iniciar sesión
  login(event: Event): void {
    if (this.formLogin.valid) {
      event.preventDefault();
      this.userService.logIn(this.formLogin.value)
        .subscribe(() => {
          this.router.navigate(['/']);
          this.notificationSuccessToast('Sesión iniciada correctamente', 'Iniciar Sesión');
        },
        err => {
          this.notificationErrorToast('Correo o contraseña incorrectas', 'Iniciar Sesión');
        });
    } else {
      this.notificationErrorToast('Faltan datos por rellenar', 'Inicio de sesión');
    }
  }

  // Función para crear usuario
  signIn(event: Event): void {
    console.log(this.formSignin.valid);
    if (this.formSignin.valid) {
      event.preventDefault();
      console.log(this.formSignin.controls.password_confirmation.value);
      /**
       * Condición para verificar si el campo contraseña era igual
       * al campo de confirmación de contraseña
       */
      if (this.formSignin.controls.password.value === this.formSignin.controls.password_confirmation.value) {
        /**
         * Se crea una copia del array original, para quitarle el campo de
         * verificación de contraseña, que no debe viajar al endpoint
         */
        const copia = Object.assign({}, this.formSignin.value);
        /**
         * Se elimina el campo de verificación de contraseña
         */
        const key = 'password_confirmation';
        delete copia[key];
        /**
         * Se envía el JSON necesario para crear una cuenta
         */
        this.userService.signIn(copia)
          .subscribe(user => {
            console.log(user);
            this.notificationSuccessToast('Usuario creado correctamente', 'Crear cuenta');
            this.signin = !this.signin;
          });
      } else {
        this.notificationErrorToast('Las contraseñas no son iguales', 'Crear cuenta');
      }
    } else {
      this.notificationErrorToast('Faltan datos por rellenar', 'Crear cuenta');
    }
  }

  private buildLoginForm(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  private buildSigninForm(): void {
    this.formSignin = this.formBuilder.group({
      str_name: ['', [Validators.required]],
      str_surname: ['', [Validators.required]],
      str_email: ['', [Validators.required, Validators.email]],
      str_phone_number: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]
    });
  }

  /*
    Funciones para las notificaciones, una de error y una de éxito
  */

  private notificationErrorToast(message: string, title: string): void {
    this.toastr.error(message, title, {
      timeOut: 2500,
      progressBar: false
    });
  }

  private notificationSuccessToast(message: string, title: string): void {
    this.toastr.success(message, title, {
      timeOut: 2500,
      progressBar: false
    });
  }
}

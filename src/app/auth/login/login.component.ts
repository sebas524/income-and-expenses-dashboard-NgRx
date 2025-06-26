import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  loginUser() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    Swal.fire({
      title: 'checking credentials',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const { email, password } = this.loginForm.value;

    this.authService
      .loginUser(email!, password!)

      .then((credentials) => {
        Swal.close();
        console.log(credentials);

        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);

        Swal.fire({
          icon: 'error',
          title: 'invalid credentials',
          text: 'please double check info being given!',
        });
      });

    this.loginForm.reset();
  }
}

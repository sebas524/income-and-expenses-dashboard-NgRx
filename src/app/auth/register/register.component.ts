import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  createUser() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    Swal.fire({
      title: 'processing credentials',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const { name, email, password } = this.registerForm.value;

    this.authService
      .createUser(name!, email!, password!)
      .then((credentials) => {
        Swal.close();

        console.log(credentials);

        this.router.navigate(['/']);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: err.message,
          text: 'please double check info being given!',
        });
      });

    console.log(this.registerForm.value);

    this.registerForm.reset();
  }
}

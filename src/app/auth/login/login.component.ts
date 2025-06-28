import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private store = inject(Store<AppState>);
  loading: boolean = false;
  uiSubs?: Subscription;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void {
    this.uiSubs = this.store.select('ui').subscribe((state) => {
      this.loading = state.isLoading;
      console.log('loading subsss');
    });
  }
  ngOnDestroy(): void {
    this.uiSubs?.unsubscribe();
  }

  loginUser() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'checking credentials',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { email, password } = this.loginForm.value;

    this.authService
      .loginUser(email!, password!)

      .then((credentials) => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());

        console.log(credentials);

        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());

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

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private store = inject(Store<AppState>);
  loading: boolean = false;
  uiSubs?: Subscription;

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void {
    this.uiSubs = this.store.select('ui').subscribe((state) => {
      this.loading = state.isLoading;
    });
  }
  ngOnDestroy(): void {
    this.uiSubs?.unsubscribe();
  }

  createUser() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'processing credentials',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    const { name, email, password } = this.registerForm.value;

    this.authService
      .createUser(name!, email!, password!)
      .then((credentials) => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());

        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());

        Swal.fire({
          icon: 'error',
          title: err.message,
          text: 'please double check info being given!',
        });
      });

    this.registerForm.reset();
  }
}

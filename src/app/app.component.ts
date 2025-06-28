import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { removeUser, setUser } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'my-income-and-expenses-app';
  private store = inject(Store<AppState>);

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.initAuthListener().subscribe((user) => {
      console.log(user);
      console.log(user?.uid);
      console.log(user?.email);

      if (user) {
        this.store.dispatch(setUser({ user: user }));
      } else {
        this.store.dispatch(removeUser());
      }
    });
  }
}

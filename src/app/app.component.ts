import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-income-and-expenses-app';

  // ?========================= Constructor =========================
  constructor(private authService: AuthService) {
    authService.initAuthListener().subscribe((user) => {
      console.log(user);
      console.log(user?.uid);
      console.log(user?.email);
    });
  }
  // ?============================================================
}

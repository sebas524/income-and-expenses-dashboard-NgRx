import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Subscription } from 'rxjs';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  router = inject(Router);
  private store = inject(Store<AppState>);
  userSubs!: Subscription;
  username: string | undefined = '';
  email: string | undefined = '';
  ngOnInit(): void {
    this.userSubs = this.store.select('user').subscribe((state) => {
      if (state.user) {
        this.username = state.user.name;
        this.email = state.user.email;
      } else {
        this.username = undefined;
        this.email = undefined;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}

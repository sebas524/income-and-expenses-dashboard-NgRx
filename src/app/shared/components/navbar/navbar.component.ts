import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../app.reducer';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [TitleCasePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private store = inject(Store<AppState>);
  userSubs!: Subscription;
  username: string | undefined = '';

  ngOnInit(): void {
    this.userSubs = this.store.select('user').subscribe((state) => {
      if (state.user) {
        this.username = state.user.name;
      } else {
        this.username = undefined;
      }
    });
  }
}

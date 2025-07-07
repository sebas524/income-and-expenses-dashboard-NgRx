import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, Subscription, take } from 'rxjs';
import { IncomeExpensesService } from './income-expenses/services/income-expenses.service';
import { setItems } from './income-expenses/income-expenses.actions';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppState>);
  private incomeExpensesService = inject(IncomeExpensesService);

  userSubs!: Subscription;
  incomeExpensesSubs!: Subscription;

  isLoading = true;

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .pipe(
        filter((auth) => {
          return auth.user != null;
        })
      )

      .subscribe((auth) => {
        const uid = auth.user!.uid;

        this.incomeExpensesSubs = this.incomeExpensesService
          .initIncomeExpensesListener(uid)
          .subscribe((data) => {
            this.store.dispatch(setItems({ items: data }));

            // Only stop loading once data is in:
            this.isLoading = false;
          });
      });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.incomeExpensesSubs.unsubscribe();
  }
}

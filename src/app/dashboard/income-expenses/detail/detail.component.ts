import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { IncomeExpenses } from '../../../models/income-expenses.model';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [CurrencyPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppState>);
  incomeExpenses: IncomeExpenses[] = [];
  incomeExpensesSubs!: Subscription;
  ngOnInit(): void {
    this.incomeExpensesSubs = this.store
      .select('incomeExpenses')
      .subscribe((state) => {
        this.incomeExpenses = state.items;
        console.log(this.incomeExpenses);
      });
  }
  ngOnDestroy(): void {
    this.incomeExpensesSubs.unsubscribe();
  }

  deleteEntry(id: string | undefined) {
    console.log(id);
  }
}

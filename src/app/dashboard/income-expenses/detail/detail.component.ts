import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { IncomeExpenses } from '../../../models/income-expenses.model';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { IncomeExpensesService } from '../services/income-expenses.service';
import Swal from 'sweetalert2';
import { OrderIncomeExpensesPipe } from '../pipes/order-income-expenses.pipe';

@Component({
  selector: 'app-detail',
  imports: [CurrencyPipe, OrderIncomeExpensesPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppState>);
  private incomeExpensesService = inject(IncomeExpensesService);
  incomeExpenses: IncomeExpenses[] = [];
  incomeExpensesSubs!: Subscription;
  ngOnInit(): void {
    this.incomeExpensesSubs = this.store
      .select('incomeExpenses')
      .subscribe((state) => {
        this.incomeExpenses = state.items;
      });
  }
  ngOnDestroy(): void {
    this.incomeExpensesSubs.unsubscribe();
  }

  deleteEntry(id: string | undefined) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the entry.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.incomeExpensesService
          .deleteIncomeExpense(id!)
          .then(() => Swal.fire('Deleted!', '', 'success'))
          .catch((err) => Swal.fire('Error', err.message, 'error'));
      }
    });
  }
}

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncomeExpensesService } from './services/income-expenses.service';
import { IncomeExpenses } from '../../models/income-expenses.model';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { isLoading, stopLoading } from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-expenses',
  imports: [ReactiveFormsModule],
  templateUrl: './income-expenses.component.html',
  styleUrl: './income-expenses.component.css',
})
export class IncomeExpensesComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store<AppState>);

  loading = false;
  type: string = 'income';
  incomeExpensesService = inject(IncomeExpensesService);
  loadingSubs!: Subscription;

  incomeExpenseForm = this.fb.group({
    description: ['', [Validators.required]],
    amount: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui').subscribe((state) => {
      this.loading = state.isLoading;
    });
  }
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  addEntry() {
    if (this.incomeExpenseForm.invalid) return;
    this.store.dispatch(isLoading());

    const { description, amount } = this.incomeExpenseForm.value;

    const incomeExpense = new IncomeExpenses(description!, amount!, this.type);
    // Convert to plain object without `undefined` fields
    const { id, ...cleanIncomeExpense } = incomeExpense;
    this.incomeExpensesService
      .createIncomeExpense(cleanIncomeExpense)
      .then(() => {
        this.store.dispatch(stopLoading());

        Swal.fire(`Entry has been added!`, description!, 'success');
      })
      .catch((err) => {
        this.store.dispatch(stopLoading());

        Swal.fire(`Error!`, err.message, 'error');
      });

    console.log(incomeExpense);

    this.incomeExpenseForm.reset();
  }
}

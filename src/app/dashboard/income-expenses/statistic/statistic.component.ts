import { Component, inject } from '@angular/core';
import { IncomeExpenses } from '../../../models/income-expenses.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { ChartComponent } from '../../../shared/components/chart/chart.component';

@Component({
  selector: 'app-statistic',
  imports: [CurrencyPipe, ChartComponent],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css',
})
export class StatisticComponent {
  income: number = 0;
  expenses: number = 0;
  totalIncome: number = 0;
  totalExpenses: number = 0;
  incomeExpensesSubs!: Subscription;

  private store = inject(Store<AppState>);
  chartConfig: ChartConfiguration | undefined;

  ngOnInit(): void {
    this.incomeExpensesSubs = this.store
      .select('incomeExpenses')
      .subscribe((state) => {
        this.generateStatistics(state.items);
      });
  }
  ngOnDestroy(): void {
    this.incomeExpensesSubs.unsubscribe();
  }

  generateStatistics(items: IncomeExpenses[]) {
    const { income, expenses, totalIncome, totalExpenses } = items.reduce(
      (acc, item) => {
        if (item.type === 'income') {
          acc.income++;
          acc.totalIncome += item.amount;
        } else if (item.type === 'expense') {
          acc.expenses++;
          acc.totalExpenses += item.amount;
        }
        return acc;
      },
      {
        income: 0,
        expenses: 0,
        totalIncome: 0,
        totalExpenses: 0,
      }
    );

    this.income = income;
    this.expenses = expenses;
    this.totalIncome = totalIncome;
    this.totalExpenses = totalExpenses;

    this.chartConfig = {
      type: 'doughnut',
      data: {
        labels: ['Income', 'Expenses'],
        datasets: [
          {
            data: [this.totalIncome, this.totalExpenses],
            backgroundColor: ['#28a745', '#dc3545'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    };
  }
}

import { Routes } from '@angular/router';
import { IncomeExpensesComponent } from './income-expenses/income-expenses.component';
import { DashboardComponent } from './dashboard.component';
import { DetailComponent } from './income-expenses/detail/detail.component';
import { StatisticComponent } from './income-expenses/statistic/statistic.component';
import { provideState } from '@ngrx/store';
import {
  incomeExpensesFeatureKey,
  incomeExpensesReducer,
} from './income-expenses/income-expenses.reducer';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    providers: [provideState(incomeExpensesFeatureKey, incomeExpensesReducer)],
    children: [
      { path: 'statistic', component: StatisticComponent },

      { path: 'detail', component: DetailComponent },

      {
        path: 'income-expenses',
        component: IncomeExpensesComponent,
      },
      { path: '**', redirectTo: 'statistic' },
    ],
  },
  { path: '**', redirectTo: '' },
];

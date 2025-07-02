import { createAction, props } from '@ngrx/store';
import { IncomeExpenses } from '../../models/income-expenses.model';

export const setItems = createAction(
  '[IncomeExpenses] setItems',
  props<{ items: IncomeExpenses[] }>()
);
export const removeItems = createAction('[IncomeExpenses] removeItems');

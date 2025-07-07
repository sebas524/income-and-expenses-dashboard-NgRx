import { Action, createReducer, on } from '@ngrx/store';
import { removeItems, setItems } from './income-expenses.actions';
import { IncomeExpenses } from '../../models/income-expenses.model';

export const incomeExpensesFeatureKey = 'incomeExpenses';

export interface State {
  items: IncomeExpenses[];
}

export const initialState: State = {
  items: [],
};

const _incomeExpenses = createReducer(
  initialState,

  on(setItems, (state, props) => ({ ...state, items: [...props.items] })),
  on(removeItems, (state) => {
    return { ...state, items: [] };
  })
);

export function incomeExpensesReducer(
  state: State | undefined,
  action: Action<string>
) {
  return _incomeExpenses(state, action);
}

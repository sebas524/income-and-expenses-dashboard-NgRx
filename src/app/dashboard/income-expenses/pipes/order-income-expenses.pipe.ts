import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpenses } from '../../../models/income-expenses.model';

@Pipe({
  name: 'orderIncomeExpenses',
})
export class OrderIncomeExpensesPipe implements PipeTransform {
  transform(items: IncomeExpenses[]): IncomeExpenses[] {
    return items.slice().sort((a, b) => {
      if (a.type === b.type) return 0;
      return a.type === 'income' ? -1 : 1;
    });
  }
}

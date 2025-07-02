import { TestBed } from '@angular/core/testing';

import { IncomeExpensesService } from './income-expenses.service';

describe('IncomeExpensesService', () => {
  let service: IncomeExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

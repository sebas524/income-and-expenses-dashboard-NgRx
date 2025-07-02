import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
} from '@angular/fire/firestore';
import { IncomeExpenses } from '../../../models/income-expenses.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeExpensesService {
  private firestore = inject(Firestore);
  private store = inject(Store<AppState>);

  constructor() {}

  async createIncomeExpense(incomeExpense: IncomeExpenses) {
    const authState = await firstValueFrom(this.store.select('user'));
    const uid = authState.user.uid;
    if (!uid) {
      throw new Error('User not found in store');
    }
    const collectionRef = collection(
      this.firestore,
      `users/${uid}/income-expenses`
    );
    await addDoc(collectionRef, { ...incomeExpense });
  }

  initIncomeExpensesListener(uid: string): Observable<IncomeExpenses[]> {
    const collectionRef = collection(
      this.firestore,
      `users/${uid}/income-expenses`
    );
    return collectionData(collectionRef, { idField: 'id' }) as Observable<
      IncomeExpenses[]
    >;
  }

  async deleteIncomeExpense(itemId: string) {
    const authState = await firstValueFrom(this.store.select('user'));
    const uid = authState.user?.uid;
    if (!uid) {
      throw new Error('User not found in store');
    }
    const itemDocRef = doc(
      this.firestore,
      `users/${uid}/income-expenses/${itemId}`
    );
    await deleteDoc(itemDocRef);
  }
}

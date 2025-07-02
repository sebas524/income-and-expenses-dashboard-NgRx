import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { from, map, Observable, switchMap } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private fireAuth = inject(Auth);
  private firestore = inject(Firestore);

  initAuthListener(): Observable<User | null> {
    return authState(this.fireAuth).pipe(
      switchMap((fbUser) => {
        if (!fbUser) return [null]; // emit null when signed out

        const userDocRef = doc(this.firestore, `users/${fbUser.uid}`);

        return from(getDoc(userDocRef)).pipe(
          map((docSnap) => {
            if (!docSnap.exists()) return null;

            const userData = docSnap.data() as User;
            return new User(fbUser.uid, userData.name, userData.email);
          })
        );
      })
    );
  }

  isAuth(): Observable<boolean> {
    return authState(this.fireAuth).pipe(map((user) => user !== null));
  }

  async createUser(name: string, email: string, password: string) {
    const firebaseUser = await createUserWithEmailAndPassword(
      this.fireAuth,
      email,
      password
    );
    const newUser = new User(
      firebaseUser.user.uid,
      name,
      firebaseUser.user.email!
    );
    const profileRef = doc(this.firestore, `users/${newUser.uid}`);
    await setDoc(profileRef, { ...newUser });

    return newUser;
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.fireAuth, email, password);
  }

  logout() {
    return this.fireAuth.signOut();
  }
}

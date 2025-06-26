import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private fireAuth = inject(Auth);
  private firestore = inject(Firestore);

  initAuthListener() {
    return authState(this.fireAuth);
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
    await setDoc(doc(this.firestore, `user/${newUser.uid}`), { ...newUser }); //! New-style Firestore
    return newUser;
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.fireAuth, email, password);
  }

  logout() {
    return this.fireAuth.signOut();
  }
}

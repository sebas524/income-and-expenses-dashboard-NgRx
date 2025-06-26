import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "income-expenses-app-5e20f", appId: "1:46847311070:web:f137e70fac3f5c82b1964f", storageBucket: "income-expenses-app-5e20f.firebasestorage.app", apiKey: "AIzaSyCM3EMHJuxbnsMMl0BbHGVYeHbC9xi1SFc", authDomain: "income-expenses-app-5e20f.firebaseapp.com", messagingSenderId: "46847311070" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};

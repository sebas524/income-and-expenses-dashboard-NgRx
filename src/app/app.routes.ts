import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { unauthenticatedGuard } from './auth/guards/unauthenticated.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => {
      return import('./dashboard/dashboard.routes').then((m) => {
        return m.dashboardRoutes;
      });
    },
    canMatch: [unauthenticatedGuard],
  },
  { path: '**', redirectTo: 'dashboard' },
];

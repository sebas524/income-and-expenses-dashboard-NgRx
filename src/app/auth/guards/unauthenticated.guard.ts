import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const unauthenticatedGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);

  const router = inject(Router);

  return authService.isAuth().pipe(
    tap((status) => {
      if (!status) {
        router.navigateByUrl('/login');
      }
    })
  );
};

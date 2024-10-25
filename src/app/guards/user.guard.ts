import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGuard {
  constructor(private authServ: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.authServ.isLoggedIn$.pipe(
      map((isLoggedIn: any) => {
        if (isLoggedIn) {
          this.router.navigate(['/home']);
        }

        return !isLoggedIn;
      })
    );
  }
}

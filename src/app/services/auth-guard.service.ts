import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(router: any, state: RouterStateSnapshot) {
    return this.authService.user$.pipe(map(
      user => {
        if (user) {

          return true;
        }
        else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }

      }
    ))

  }


}

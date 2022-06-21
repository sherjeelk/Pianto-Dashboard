import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import {UtilsService} from '../../services/utils.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private utilService: UtilsService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.utilService.auth.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        console.log('this is boolean user', isAuth, user);
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })

    );
  }
}

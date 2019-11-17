import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from './store';
import { isLoggedIn } from './store/auth';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isLoggedIn$: Observable<boolean>;
  private userLoggedIn: boolean;
  constructor(private store: Store<AppState>, private router: Router) {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn))
    this.isLoggedIn$.subscribe(result => {
      this.userLoggedIn = result;
    })
  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    //check some condition  
    if (!this.userLoggedIn) {
      this.router.navigate(['/auth'])
      return false;
    }
    return true;
  }

}

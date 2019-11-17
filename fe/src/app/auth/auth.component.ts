import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store';
import { FormBuilder, Validators } from '@angular/forms'
import { LoggedIn } from '../store/auth/login.model';
import { setUserDetails } from '../store/auth/login.actions';
import { isLoggedIn } from '../store/auth/login.selector';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoggedIn$: Observable<boolean>

  constructor(private store: Store<AppState>, private fb: FormBuilder, private router: Router) {
    this.store.pipe(select(isLoggedIn)).subscribe(result => {
      if (result) {
        this.router.navigate(['home'])
      }
    })
  }

  ngOnInit() {

  }


}

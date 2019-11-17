import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';
import { isLoggedIn, LoggedIn, setUserDetails } from '../store/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn$: Observable<boolean>
  authForm = this.fb.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", [Validators.required]],
  })

  constructor(private store: Store<AppState>, private fb: FormBuilder, private authService: AuthService) {
    this.store.pipe(select(isLoggedIn))
      .subscribe(result => {
        console.log('Login me: ', result);
      })
  }

  ngOnInit() { }
  submitLogin() {
    if (this.authForm.valid) {
      const payload = {
        email: this.authForm.controls.email.value,
        password: this.authForm.controls.password.value,
      }

      this.authService.login(payload).subscribe((result: any) => {
        if (result.status === 'success') {
          const payload: LoggedIn = {
            email: this.authForm.value.email,
            isLoggedIn: true,
            token: result.token
          }
          this.store.dispatch(setUserDetails(payload))
        } else {
          alert(result.message)
        }
      })
    }
  }
}

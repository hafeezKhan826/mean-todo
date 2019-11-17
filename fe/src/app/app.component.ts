import { Component } from '@angular/core';
import { LoggedIn, setUserDetails } from './store/auth';
import { AppState } from './store';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-list';
  constructor(private store: Store<AppState>, private router: Router) { }
  logout() {
    console.log('Logout called');
    const payload: LoggedIn = {
      email: "",
      isLoggedIn: false,
      token: ''
    }
    this.store.dispatch(setUserDetails(payload))
    this.router.navigate(['auth'])
  }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isLoggedIn, loginDetails } from './store/auth';
import { AppState } from './store';
import { select, Store } from '@ngrx/store';

@Injectable()
export class ToDoInterceptor implements HttpInterceptor {
    email: any;
    token: any;
    constructor(private store: Store<AppState>) {
        this.store.pipe(select(loginDetails)).subscribe((result: any) => {
            if (result.isLoggedIn) {
                this.email = result.email
                this.token = result.token
            }
        });
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.email && this.token) {
            const modified = req.clone({ setHeaders: { 'email': this.email, 'token': this.token } });
            return next.handle(modified);
        }
    }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent, AddToDoModal } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { StoreModule } from '@ngrx/store';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { metaReducers, reducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { MaterialModule } from './material.module';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToDoInterceptor } from './interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    AddToDoModal,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NoopAnimationsModule
  ],
  entryComponents: [
    AddToDoModal
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ToDoInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

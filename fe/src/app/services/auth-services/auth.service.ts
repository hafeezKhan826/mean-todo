import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiSettings } from 'src/app/api.settings';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private backend: HttpBackend) {
    this.http = new HttpClient(backend);
  }

  login(user) {
    const url = environment.baseUrl + apiSettings.userBaseUrl + apiSettings.login;
    return this.http.post(url, user)
  }

  register(user) {
    const url = environment.baseUrl + apiSettings.userBaseUrl + apiSettings.register;
    return this.http.post(url, user)
  }
}

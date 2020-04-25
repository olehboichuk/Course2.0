import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../models/login.model';
import {UserModel} from '../models/user.model';
import {LanguagesList} from '../models/languagesList';
import {Token} from '../models/token';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // URIs
  private logoutURL = '/api/logout';
  private logInURL = '/api/login';
  private registerURL = '/api/register';
  private getLanguagesURL = '/api/languages';

  // tslint:disable-next-line:variable-name
  public _logInUser = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(user: LoginModel) {
    return this.http.post<Token>(this.logInURL, user);
  }

  isLoggedIn() {
    if (!moment(new Date().toUTCString()).isBefore(this.getExpiration()) && localStorage.getItem('token') && this._logInUser) {
      this.logoutUser();
    }
    return moment(new Date().toUTCString()).isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('expires_at');
    this._logInUser = false;
    this.router.navigate(['/login']);
  }

  registerUser(user: UserModel) {
    return this.http.post(this.registerURL, user);
  }

  getLanguages() {
    return this.http.get<LanguagesList[]>(this.getLanguagesURL);
  }

}

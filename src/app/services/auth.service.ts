import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../models/login.model';
import {UserModel} from '../models/user.model';
import {LanguagesList} from '../models/languagesList';
import {Token} from '../models/token';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {Uris} from './uris';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // tslint:disable-next-line:variable-name
  public _logInUser = false;

  constructor(private http: HttpClient, private router: Router, private uri: Uris) {
  }

  login(user: LoginModel) {
    return this.http.post<Token>(this.uri.logInURL, user);
  }

  isLoggedIn() {
    return this._logInUser;
  }

  set logInUserBool(logInUser: boolean) {
    this._logInUser = logInUser;
  }

  logoutUser() {
    this.http.get(this.uri.logoutURL);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this._logInUser = false;
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.router.navigate(['/login']);
  }

  registerUser(user: UserModel) {
    return this.http.post(this.uri.registerURL, user);
  }

  getLanguages() {
    return this.http.get<LanguagesList[]>(this.uri.getLanguagesURL);
  }

}

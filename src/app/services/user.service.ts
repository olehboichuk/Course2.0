import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserModel} from '../models/user.model';
import {LanguagesList} from '../models/languagesList';
import {Uris} from './uris';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private router: Router, private uri: Uris) {
  }

  getUser() {
    return this.http.get<UserModel>(this.uri.userURL);
  }

  getUserRole() {
    return this.http.get(this.uri.userRoleURL);
  }

  updateUser(user: UserModel) {
    return this.http.put<UserModel>(this.uri.userURL, user);
  }

  getUserLanguages() {
    return this.http.get<LanguagesList[]>(this.uri.userLanguagesURL);
  }

  getUserLanguagesById(id: number) {
    return this.http.get<LanguagesList[]>(this.uri.userLanguagesURL + '/' + id);
  }

  getLanguages() {
    return this.http.get<LanguagesList[]>(this.uri.languagesURL);
  }

  deleteUser(id: number) {
    return this.http.delete(this.uri.userURL);
  }

  getUserSubscriptions() {
    return this.http.get<UserModel[]>(this.uri.userSubscriptionsURL);
  }

  // tslint:disable-next-line:variable-name
  getUserById(number: number) {
    return this.http.get<UserModel>(this.uri.userURL + '/' + number);
  }

  // tslint:disable-next-line:variable-name
  getTeacherSubscribersById(number: number) {
    return this.http.get(this.uri.userSubscriptionsURL + '/' + number);
  }

  subscribeTo(id: number) {
    return this.http.get(this.uri.subscribeURL + id + '/subscribe');
  }

  unsubscribeTo(id: number) {
    return this.http.delete(this.uri.subscribeURL + id + '/subscribe');
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserModel} from '../models/user.model';
import {LanguagesList} from '../models/languagesList';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userURL = '/api/user/profile';
  private userSubscriptionsURL = '/api/user/subscriptions';
  private subscribeURL = '/api/user/';
  private userRoleURL = '/api/user/role';
  private userLanguagesURL = '/api/user/languages';
  private languagesURL = '/api/languages';

  constructor(private http: HttpClient, private router: Router) {
  }

  getUser() {
    return this.http.get<UserModel>(this.userURL);
  }

  getUserRole() {
    return this.http.get(this.userRoleURL);
  }

  updateUser(user: UserModel) {
    return this.http.put<UserModel>(this.userURL, user);
  }

  getUserLanguages() {
    return this.http.get<LanguagesList[]>(this.userLanguagesURL);
  }

  getUserLanguagesById(id: number) {
    return this.http.get<LanguagesList[]>(this.userLanguagesURL + '/' + id);
  }

  getLanguages() {
    return this.http.get<LanguagesList[]>(this.languagesURL);
  }

  deleteUser(id: number) {
    return this.http.delete(this.userURL);
  }

  getUserSubscriptions() {
    return this.http.get<UserModel[]>(this.userSubscriptionsURL);
  }

  // tslint:disable-next-line:variable-name
  getUserById(number: number) {
    return this.http.get<UserModel>(this.userURL + '/' + number);
  }

  // tslint:disable-next-line:variable-name
  getTeacherSubscribersById(number: number) {
    return this.http.get(this.userSubscriptionsURL + '/' + number);
  }

  subscribeTo(id: number) {
    return this.http.get(this.subscribeURL + id + '/subscribe');
  }

  unsubscribeTo(id: number) {
    return this.http.delete(this.subscribeURL + id + '/subscribe');
  }
}

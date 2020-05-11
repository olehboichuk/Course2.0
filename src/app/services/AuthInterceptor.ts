import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _cookieService: CookieService) {
  }

  getCookie(key: string) {
    return this._cookieService.get(key);
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    // const idToken = localStorage.getItem('token');
    const idToken = this.getCookie('token');

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('x-access-token', idToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

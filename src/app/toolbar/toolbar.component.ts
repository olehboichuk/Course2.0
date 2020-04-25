import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  public _authService: AuthService;

  // private URL = 'http://localhost:3000/api/user/id';
  private URL = '/api/user/id';

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this._authService = authService;
  }

  ngOnInit() {
    this.httpClient.get(this.URL).subscribe(res => {
      this.authService.logInUserBool = true;
    });
  }

}

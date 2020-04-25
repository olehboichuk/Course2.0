import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Uris} from '../services/uris';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  public _authService: AuthService;

  constructor(private authService: AuthService, private httpClient: HttpClient, private uri: Uris) {
    this._authService = authService;
  }

  ngOnInit() {
    this.httpClient.get(this.uri.URL).subscribe(res => {
      this.authService.logInUserBool = true;
    });
  }

}

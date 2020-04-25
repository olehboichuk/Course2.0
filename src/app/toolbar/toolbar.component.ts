import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  private _authService: AuthService;

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this._authService = authService;
  }

  ngOnInit() {
  }

}

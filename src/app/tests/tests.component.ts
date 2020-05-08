import {Component, OnInit} from '@angular/core';
import {TestModel} from '../models/test.model';
import * as jwt_decode from 'jwt-decode';
import {TestService} from '../services/test.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  tests: TestModel[];
  loading = false;
  userId: number;

  constructor(public testService: TestService) {
  }

  ngOnInit() {
    this.tests = [];
    this.loading = true;
    this.userId = jwt_decode(localStorage.getItem('token')).id;
    this.testService.getTests().subscribe(testsData => {
      this.tests = testsData;
      console.log(this.tests);
      this.loading = false;
    });
  }

}

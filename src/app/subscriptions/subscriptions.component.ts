import {Component, OnInit} from '@angular/core';
import {UserModel} from "../models/user.model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  private users: UserModel [] = [];
  loading = true;

  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getUserSubscriptions().subscribe(res => {
      this.users = res;
      this.loading = false;
    });
  }

}

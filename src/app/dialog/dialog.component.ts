import {Component, Inject, OnInit} from '@angular/core';
import {DialogDataModel} from "../models/dialogData.model";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  public playerId: string;
  public first_name:string;
  public last_name:string;


  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataModel, private formBuilder: FormBuilder, private userService: UserService, public route: ActivatedRoute, private router: Router) {
    this.first_name = this.data.first_name;
    this.last_name = this.data.last_name;
  }

  onNoClick(): void {
    this.userService.deleteUser(this.data.id).subscribe(res => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("expires_at");
      this.router.navigate(['/']);
    }, error => {
      console.warn('no ok');
    });


  }
}

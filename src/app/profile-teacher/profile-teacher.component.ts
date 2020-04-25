import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../models/user.model";
import {UserService} from "../services/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {LanguagesList} from "../models/languagesList";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import * as jwt_decode from 'jwt-decode';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile-teacher',
  templateUrl: './profile-teacher.component.html',
  styleUrls: ['./profile-teacher.component.scss']
})
export class ProfileTeacherComponent implements OnInit {
  private changeForm: FormGroup;
  public loading = true;
  public loadingSubs = false;
  private edited = true;
  private user: UserModel;
  private languages: LanguagesList [];
  private langListNames = '';
  private langListIds: number[] = [];
  private star: number;
  private isMyProfile: boolean;
  private userId: string;
  private subscribe = true;
  private subscribeToIdsList: number[] = [];
  private subscribeText: string;

  constructor(public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder, private userService: UserService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = true;
    this.loadingSubs = false;
    this.langListIds = [];
    this.langListNames = '';
    this.edited = true;
    this.changeForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      languages: ['', Validators.required],
      about: [''],
      email: ['', [Validators.required, Validators.email]],
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.isMyProfile = false;
        this.userId = paramMap.get('userId');
        this.userService.getUserById(+this.userId).subscribe(res => {
          this.user = res[0];
          this.star = this.user.rate;
          this.userService.getUserLanguagesById(+this.userId).subscribe(lang => {
            for (let i in lang) {
              this.langListNames += lang[i].name + ', ';
              this.langListIds[i] = lang[i].id;
            }
            this.langListNames = this.langListNames.substring(0, this.langListNames.length - 2);
            this.userService.getLanguages().subscribe(
              allLan => {
                this.languages = allLan;
                this.userService.getTeacherSubscribersById(+this.userId).subscribe(sub => {
                  for (let i in sub) {
                    this.subscribeToIdsList[i] = sub[i].id;
                  }
                  let userID = jwt_decode(localStorage.getItem('token')).id;
                  if(this.userId==userID){
                    this.router.navigate(['/teacher-profile']);
                  }
                  if (this.subscribeToIdsList.includes(userID)) {
                    this.subscribeText = 'UNSUBSCRIBE';
                    this.subscribe = false;
                  } else {
                    this.subscribeText = 'Subscribe Now';
                    this.subscribe = true;
                  }
                  this.loading = false;
                });
              });
          })
        });
      } else {
        this.isMyProfile = true;
        this.userService.getUser().subscribe(res => {
          this.user = res[0];
          this.star = this.user.rate;
          this.userService.getUserLanguages().subscribe(lang => {
            for (let i in lang) {
              this.langListNames += lang[i].name + ', ';
              this.langListIds[i] = lang[i].id;
            }
            this.langListNames = this.langListNames.substring(0, this.langListNames.length - 2);
            this.userService.getLanguages().subscribe(
              allLan => {
                this.languages = allLan;
                this.loading = false;
              });
          })
        });
      }
    });
  }

  onEdit() {
    this.edited = false;
    this.changeForm.controls['first_name'].setValue(this.user.first_name);
    this.changeForm.controls['last_name'].setValue(this.user.last_name);
    this.changeForm.controls['email'].setValue(this.user.email);
    this.changeForm.controls['about'].setValue(this.user.about);
    this.changeForm.controls['languages'].setValue(this.langListIds);
  }

  onCancel() {
    this.edited = true;
  }

  onSave() {
    const user = <UserModel>{
      first_name: this.changeForm.get('first_name').value,
      last_name: this.changeForm.get('last_name').value,
      email: this.changeForm.get('email').value,
      about: this.changeForm.get('about').value,
      languageIds: this.changeForm.get('languages').value,
      id: this.user.id
    }
    this.loading = true;
    this.userService.updateUser(user).subscribe(res => {
      this.ngOnInit();
    }, error => {
      this.loading = false;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '320px',
      height: '200px',
      data: {id: this.user.id, first_name: this.user.first_name, last_name: this.user.last_name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  Subscribe() {
    if (this.subscribe && !this.loadingSubs) {
      this.loadingSubs = true;
      this.userService.subscribeTo(+this.userId).subscribe(res => {
        this.subscribe = false;
        this.subscribeText = 'UNSUBSCRIBE';
        this.loadingSubs = false;
      });
    }
    if (!this.subscribe && !this.loadingSubs) {
      this.loadingSubs = true;
      this.userService.unsubscribeTo(+this.userId).subscribe(res => {
        this.subscribe = true;
        this.subscribeText = 'Subscribe Now';
        this.loadingSubs = false;
      });
    }
  }
}

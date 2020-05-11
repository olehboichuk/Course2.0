import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UserModel} from '../models/user.model';
import {UserService} from '../services/user.service';
import {DialogComponent} from '../dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {LessonModel} from '../models/lesson.model';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.scss']
})
export class ProfileStudentComponent implements OnInit {
  public changeForm: FormGroup;
  public loading = true;
  public edited = true;
  public user: UserModel;
  public isMyProfile: boolean;
  public userId: string;
  future_joined_lessons: LessonModel[] = [];
  past_joined_lessons: LessonModel[] = [];

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private userService: UserService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = true;
    this.edited = true;
    this.changeForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.isMyProfile = false;
        this.userId = paramMap.get('userId');

        this.userService.getUserById(+this.userId).subscribe(res => {
          this.user = res[0];
          this.userService.getStudentLessonsById(+this.userId).subscribe(res => {
            console.log(res);
            this.future_joined_lessons = res['future_joined_lessons'];
            this.past_joined_lessons = res['past_joined_lessons'];
            this.loading = false;
          });
        });
      } else {
        this.isMyProfile = true;
        this.userService.getUser().subscribe(res => {
          this.user = res[0];
          this.userService.getStudentLessons().subscribe(res => {
            console.log(res);
            this.future_joined_lessons = res['future_joined_lessons'];
            this.past_joined_lessons = res['past_joined_lessons'];
            this.loading = false;
          });
        });
      }
    });
  }

  onEdit() {
    this.edited = false;
    this.changeForm.controls.first_name.setValue(this.user.first_name);
    this.changeForm.controls.last_name.setValue(this.user.last_name);
    this.changeForm.controls.email.setValue(this.user.email);
  }

  onCancel() {
    this.edited = true;
  }

  onSave() {
    const user = {
      first_name: this.changeForm.get('first_name').value,
      last_name: this.changeForm.get('last_name').value,
      email: this.changeForm.get('email').value,
      about: '',
      id: this.user.id
    } as UserModel;
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
}

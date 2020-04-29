import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {LessonModel} from '../models/lesson.model';
import {LessonService} from '../services/lesson.service';
import * as jwt_decode from 'jwt-decode';
import moment from 'moment-timezone';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  public loading = false;
  public err = false;
  public lessonId: string;
  public lesson: LessonModel;
  public isMyProfile: boolean;
  public joins: boolean;
  public userId: number;
  public joinedCount: number;
  public time: Date;
  public joined = false;
  public disableButton = false;
  public fullUsers = false;

  constructor(private snackBar: MatSnackBar,
              private router: Router, public lessonService: LessonService,
              public userService: UserService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isMyProfile = false;
    this.disableButton = false;
    this.joins = false;
    this.loading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('lessonId')) {
        this.lessonId = paramMap.get('lessonId');
        this.lessonService.getLessonById(+this.lessonId).subscribe(lesson => {
          console.log(lesson);
          this.lesson = lesson;
          this.time = new Date(moment(this.lesson.start_time).add('3','hour'));
          this.joinedCount = lesson.users_join;
          this.joined = this.lesson.if_user_joined !== null;
          this.userId = jwt_decode(localStorage.getItem('token')).id;
          if (this.lesson.id_teacher == this.userId) {
            this.isMyProfile = true;
          }
          if(this.lesson.max_attendees==this.lesson.users_join&&!this.joined){
            this.fullUsers = true;
          }
          this.loading = false;
        }, error => {
          this.loading = false;
          this.err = true;
          this.snackBar.open(error.error.message, '', {
            duration: 2000,
          });
        });
      }
    });
  }

  onEdit() {
    this.router.navigate(['/edit-lesson', this.lesson.id]);
  }

  onTerminate() {
    this.lessonService.terminateLesson(+this.lessonId).subscribe(res=>{
      this.router.navigate(['/lesson-list']);
      this.snackBar.open('LESSON TERMINATED', '', {
        duration: 20000,
      });
    });
  }

  onJoin() {
    this.joins = true;
    if (!this.joined && !this.disableButton && !this.fullUsers) {
      this.disableButton = true;
      this.lessonService.joinLesson(+this.lessonId).subscribe(res => {
        this.joined = true;
        this.joinedCount++;
        this.joins = false;
        this.disableButton = false;
      });
    }
    if (this.joined && !this.disableButton) {
      this.disableButton = true;
      this.lessonService.leaveLesson(+this.lessonId).subscribe(res => {
        this.joined = false;
        this.joinedCount--;
        this.joins = false;
        this.disableButton = false;
      });
    }
  }
}

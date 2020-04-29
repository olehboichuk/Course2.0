import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../services/article.service';
import {UserService} from '../services/user.service';
import * as jwt_decode from 'jwt-decode';
import {LessonModel} from '../models/lesson.model';
import {LessonService} from '../services/lesson.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  lessons: LessonModel[];
  loading = false;
  userId: number;

  constructor(public lessonService: LessonService,
              public userService: UserService) { }

  ngOnInit() {
    this.lessons = [];
    this.loading = true;
    this.userId = jwt_decode(localStorage.getItem('token')).id;
    this.lessonService.getLessons().subscribe(lessonsData => {
      this.lessons = lessonsData;
      console.log(this.lessons);
      this.loading = false;
    });
  }

}

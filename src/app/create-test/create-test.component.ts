import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ArticleService} from '../services/article.service';
import {LessonService} from '../services/lesson.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {QuestionModel} from '../models/question.model';
import {TestModel} from '../models/test.model';
import * as jwt_decode from 'jwt-decode';
import {TestService} from '../services/test.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  public loading = false;
  public createTestForm: FormGroup;
  public test: QuestionModel[];
  public testTitle = '';
  public userId: number;

  constructor(private snackBar: MatSnackBar,
              public testService: TestService,
              private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router,
              public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = jwt_decode(localStorage.getItem('token')).id;
    this.test = [];
    this.createTestForm = this.formBuilder.group({
      question: ['', [Validators.required, Validators.minLength(2)]],
      first_question: ['', [Validators.required]],
      second_question: ['', [Validators.required]],
      third_question: ['', [Validators.required]],
      right_question: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.loading = true;
    const question = {
      question: this.createTestForm.controls.question.value,
      first_question: this.createTestForm.controls.first_question.value,
      second_question: this.createTestForm.controls.second_question.value,
      third_question: this.createTestForm.controls.third_question.value,
      right_question: this.createTestForm.controls.right_question.value,
    } as QuestionModel;
    this.createTestForm.controls.question.setValue(null);
    this.createTestForm.controls.first_question.setValue(null);
    this.createTestForm.controls.second_question.setValue(null);
    this.createTestForm.controls.third_question.setValue(null);
    this.createTestForm.controls.right_question.setValue(null);
    this.test.push(question);
    this.loading = false;
  }

  onDelete(i: number) {
    this.test.splice(i, 1);
  }

  onEdit(que: QuestionModel) {
    this.createTestForm.controls.question.setValue(que.question);
    this.createTestForm.controls.first_question.setValue(que.first_question);
    this.createTestForm.controls.second_question.setValue(que.second_question);
    this.createTestForm.controls.third_question.setValue(que.third_question);
    this.createTestForm.controls.right_question.setValue(que.right_question);
    this.test.splice(this.test.indexOf(que), 1);
  }

  addTest() {
    this.loading = true;
    if (this.testTitle.trim() === '') {
      this.loading = false;
      return;
    }
    const test = {
      id_author: this.userId,
      questions: this.test,
      test_name: this.testTitle,
      time_posted: new Date(),
      questions_number: this.test.length
    } as TestModel;
    this.testService.createTest(test).subscribe(res => {
      console.log('success');
      this.loading = false;
      this.router.navigate(['/test-list']);
    });
  }
}

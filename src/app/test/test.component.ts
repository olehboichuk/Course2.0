import {Component, OnInit} from '@angular/core';
import {TestModel} from '../models/test.model';
import {TestService} from '../services/test.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {FormlyFormOptions, FormlyFieldConfig} from '@ngx-formly/core';
import {of} from 'rxjs';
import {QuestionModel} from '../models/question.model';
import {UserAnswerModel} from '../models/userAnswer.model';
import {UserService} from '../services/user.service';
import {MatTableDataSource} from '@angular/material';
import * as jwt_decode from 'jwt-decode';

export interface StepType {
  label: string;
  fields: FormlyFieldConfig[];
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  activedStep = 0;
  loading: boolean;
  test: TestModel;
  test_results: QuestionModel[];
  testId: number;
  is_test_started = false;
  start_time: any;
  time_spend: any;
  counter: number;
  userId: number;
  points_count: number;
  timerRef;
  model = {};
  steps: StepType[];
  form: any;
  options: any;
  check_results: boolean;
  passed: boolean;
  public displayedColumns: string[] = ['First_Name', 'Points', 'Time_Spend'];
  public dataSource: any;
  text_btn = 'CLOSE RESULTS';
  public isMyProfile: boolean;


  constructor(private userService: UserService, private router: Router,
              public route: ActivatedRoute, public testService: TestService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.isMyProfile = false;
    this.check_results = false;
    this.passed = false;
    this.steps = [];
    this.loading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('testId')) {
        this.testId = +paramMap.get('testId');
        this.userId = jwt_decode(localStorage.getItem('token')).id;
        this.testService.getTestById(this.testId).subscribe(res => {
          console.log(res);
          this.test = res;
          if (this.test.id_author === this.userId) {
            this.isMyProfile = true;
          }
          this.dataSource = new MatTableDataSource(this.test.top_user_answer);
          let i = 0;
          this.test.questions.forEach(el => {
            i++;
            let answers = [];
            answers.push(el.first_question);
            answers.push(el.second_question);
            answers.push(el.right_question);
            answers.push(el.third_question);
            this.shuffle(answers);
            this.steps.push(
              {
                label: 'Question ' + i,
                fields: [
                  {
                    key: '' + el.id,
                    type: 'radio',
                    templateOptions: {
                      type: 'array',
                      label: el.question,
                      required: true,
                      options: of([
                        {value: answers[0], label: answers[0]},
                        {value: answers[1], label: answers[1]},
                        {value: answers[2], label: answers[2]},
                        {value: answers[3], label: answers[3]},
                      ]),
                    },
                  },
                ],
              });
          });
          this.form = new FormArray(this.steps.map(() => new FormGroup({})));
          this.options = this.steps.map(() => <FormlyFormOptions> {});
          this.testService.ifUserPassTest(this.testId).subscribe(res => {
            console.log(res);
            if (res.length > 0) {
              this.passed = true;
              this.time_spend = res[0].time_spend;
              this.points_count = res[0].user_points;
            }
            this.loading = false;
          });

        });
      }
    });
  }

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  onStart() {
    this.is_test_started = true;
    if (this.is_test_started) {
      this.start_time = Date.now();
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - this.start_time;
      });
    } else {
      clearInterval(this.timerRef);
    }
  }

  submit() {
    this.is_test_started = false;
    this.passed = true;
    this.test_results = this.test.questions;
    this.points_count = 0;
    this.test_results.forEach(el => {
      el.user_answer = this.model[el.id];
      if (el.right_question === this.model[el.id]) {
        this.points_count++;
      }
    });
    this.time_spend = this.counter;
    this.check_results = true;
    this.counter = undefined;
    clearInterval(this.timerRef);
    const user_answer = <UserAnswerModel> {
      id_test: this.testId,
      user_points: this.points_count,
      time_spend: this.time_spend
    };
    this.testService.addUserAnswers(user_answer).subscribe(res => {

    });
  }

  onClose() {
    this.test_results = this.test.questions;
    this.text_btn === 'CLOSE ANSWERS' ? this.text_btn = 'OPEN ANSWERS' : this.text_btn = 'CLOSE ANSWERS';
    this.check_results = !this.check_results;
  }

  redirectToProfile(id: number) {
    this.userService.getUserRoleById(id).subscribe(data => {
      let roles = [];
      for (const i in data) {
        roles[i] = data[i].name;
      }
      if (roles.includes('TEACHER')) {
        this.router.navigate(['/teacher-profile', id]);
      } else if (roles.includes('STUDENT')) {
        this.router.navigate(['/student-profile', id]);
      }
    });
  }

  onDelete() {
    this.testService.deleteTestById(this.testId).subscribe(res=>{
      this.router.navigate(['/test-list']);
    });
  }
}

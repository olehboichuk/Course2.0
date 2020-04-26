import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ArticleService} from '../services/article.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {TopicModel} from '../models/topic.model';
import {UserService} from '../services/user.service';
import {LanguagesList} from '../models/languagesList';
import {ErrorStateMatcher} from '@angular/material';
import {LessonModel} from '../models/lesson.model';

export interface Duration {
  title: string;
  minutes: number;
}
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.scss']
})
export class CreateLessonComponent implements OnInit {
  public errorMatcher = new CrossFieldErrorMatcher();
  public loading = false;
  public isEdit = false;
  public createLessonForm: FormGroup;
  public headlineText: string;
  public btnText: string;
  public topics: TopicModel[];
  public userLanguages: LanguagesList[];
  public minDate = new Date(Date.now());
  public durations: Duration[] = [
    {title: '30 min', minutes: 30},
    {title: '1 h', minutes: 60},
    {title: '1h 30min', minutes: 90},
    {title: '2 h', minutes: 120},
    {title: '2h 30min', minutes: 150},
    {title: '3 h', minutes: 180},
    {title: '3h 30min', minutes: 210},
    {title: '4 h', minutes: 240},
  ];

  constructor(private snackBar: MatSnackBar,
              public articleService: ArticleService,
              private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router,
              public route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.btnText = 'Create lesson';
    this.headlineText = 'Create new lesson';
    this.loading = true;
    this.isEdit = false;
    this.createLessonForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      id_language: ['', [Validators.required]],
      id_topic: ['', [Validators.required]],
      date: ['', [Validators.required]],
      duration_minutes: ['', [Validators.required]],
      min_attendees: [null, [Validators.required]],
      max_attendees: [null, [Validators.required]],
      description: ['', Validators.required],
      time: [this.minDate, [Validators.required]],
    }, {
      validators: [this.attendeesValidator],
    });
    this.articleService.getTopics().subscribe(topics => {
      this.topics = topics;
      this.userService.getUserLanguages().subscribe(lang => {
        this.userLanguages = lang;
        this.loading = false;
      });
    });
  }

  attendeesValidator(form: FormGroup) {
    const condition = form.get('max_attendees').value < form.get('min_attendees').value;
    return condition ? { amountAttendeesInvalid: true} : null;
  }

  onSubmit() {
    const date = this.createLessonForm.controls.date.value;
    const time = this.createLessonForm.controls.time.value;
    const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0);
    const lesson = {
      title: this.createLessonForm.controls.title.value,
      id_language: this.createLessonForm.controls.id_language.value,
      id_topic: this.createLessonForm.controls.id_topic.value,
      id_teacher: this.createLessonForm.controls.id_topic.value,
      duration_minutes: this.createLessonForm.controls.duration_minutes.value.minutes,
      min_attendees: this.createLessonForm.controls.min_attendees.value,
      max_attendees: this.createLessonForm.controls.max_attendees.value,
      description: this.createLessonForm.controls.description.value,
      start_time: startDate,
    } as LessonModel;
    this.articleService.createLesson(lesson).subscribe(res => {
      console.log('success');
      this.router.navigate(['/teacher-profile']);
    });
  }
}

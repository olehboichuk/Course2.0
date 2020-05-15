import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterTeacherComponent} from './register-teacher/register-teacher.component';
import {RegisterStudentComponent} from './register-student/register-student.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ProfileStudentComponent} from './profile-student/profile-student.component';
import {ProfileTeacherComponent} from './profile-teacher/profile-teacher.component';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';
import {CreateArticleComponent} from './create-article/create-article.component';
import {ArticlesComponent} from './articles/articles.component';
import {ArticleComponent} from './article/article.component';
import {CreateLessonComponent} from './create-lesson/create-lesson.component';
import {LessonsComponent} from './lessons/lessons.component';
import {LessonComponent} from './lesson/lesson.component';
import {CreateTestComponent} from './create-test/create-test.component';
import {TestsComponent} from './tests/tests.component';
import {TestComponent} from './test/test.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register-teacher', component: RegisterTeacherComponent},
  {path: 'register-student', component: RegisterStudentComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'teacher-profile', component: ProfileTeacherComponent},
  {path: 'student-profile/:userId', component: ProfileStudentComponent},
  {path: 'teacher-profile/:userId', component: ProfileTeacherComponent},
  {path: 'student-profile', component: ProfileStudentComponent},
  {path: 'subscriptions', component: SubscriptionsComponent},
  {path: 'create-article', component: CreateArticleComponent},
  {path: 'create-test', component: CreateTestComponent},
  {path: 'create-lesson', component: CreateLessonComponent},
  {path: 'edit-article/:articleId', component: CreateArticleComponent},
  {path: 'edit-lesson/:lessonId', component: CreateLessonComponent},
  {path: 'lesson-list', component: LessonsComponent},
  {path: 'article-list', component: ArticlesComponent},
  {path: 'test-list', component: TestsComponent},
  {path: 'article/:articleId', component: ArticleComponent},
  {path: 'lesson/:lessonId', component: LessonComponent},
  {path: 'test/:testId', component: TestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

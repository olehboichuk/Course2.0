import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterTeacherComponent} from "./register-teacher/register-teacher.component";
import {RegisterStudentComponent} from "./register-student/register-student.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ProfileStudentComponent} from "./profile-student/profile-student.component";
import {ProfileTeacherComponent} from "./profile-teacher/profile-teacher.component";
import {VerificationComponent} from "./verification/verification.component";
import {SubscriptionsComponent} from "./subscriptions/subscriptions.component";
import {CreateArticleComponent} from "./create-article/create-article.component";
import {ArticlesComponent} from "./articles/articles.component";
import {ArticleComponent} from "./article/article.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
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
  {path: 'create-article/:articleId', component: CreateArticleComponent},
  {path: 'article-list', component: ArticlesComponent},
  {path: 'article/:articleId', component: ArticleComponent},
  {path: 'verify', component: VerificationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

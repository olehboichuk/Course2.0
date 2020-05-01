import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {RegisterTeacherComponent} from './register-teacher/register-teacher.component';
import {RegisterStudentComponent} from './register-student/register-student.component';
import {ProfileTeacherComponent} from './profile-teacher/profile-teacher.component';
import {ProfileStudentComponent} from './profile-student/profile-student.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {HomeComponent} from './home/home.component';
import {VerificationComponent} from './verification/verification.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthInterceptor} from './services/AuthInterceptor';
import {RatingModule} from 'ng-starrating';
import {DialogComponent} from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';
import {CreateArticleComponent} from './create-article/create-article.component';
import {ArticlesComponent} from './articles/articles.component';
import {MatChipsModule} from '@angular/material/chips';
import {ArticleComponent} from './article/article.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {CookieModule, CookieService} from 'ngx-cookie';
import {Uris} from './services/uris';
import { LessonsComponent } from './lessons/lessons.component';
import { CreateLessonComponent } from './create-lesson/create-lesson.component';
import {MatDatepickerModule, MatListModule, MatNativeDateModule, MatTabsModule} from '@angular/material';
import {TimepickerActions, TimepickerConfig, TimepickerModule} from 'ngx-bootstrap/timepicker';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {DatePipe} from '@angular/common';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { LessonComponent } from './lesson/lesson.component';
import { CommentsSectionComponent } from './comments-section/comments-section.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    RegisterTeacherComponent,
    RegisterStudentComponent,
    ProfileTeacherComponent,
    ProfileStudentComponent,
    ForgotPasswordComponent,
    HomeComponent,
    VerificationComponent,
    SidebarComponent,
    DialogComponent,
    SubscriptionsComponent,
    CreateArticleComponent,
    ArticlesComponent,
    ArticleComponent,
    LessonsComponent,
    CreateLessonComponent,
    LessonComponent,
    CommentsSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    RatingModule,
    MatDialogModule,
    MatChipsModule,
    MatSnackBarModule,
    CookieModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatDatepickerModule,
    TimepickerModule,
    MatNativeDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatTabsModule,
    FormsModule,
    MatListModule,
  ],
  providers: [TimepickerConfig, TimepickerActions, DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {duration: 2500}
  }, Uris],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule {
}

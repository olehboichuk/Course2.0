import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './login/login.component';
import {RegisterTeacherComponent} from './register-teacher/register-teacher.component';
import {RegisterStudentComponent} from './register-student/register-student.component';
import {ProfileTeacherComponent} from './profile-teacher/profile-teacher.component';
import {ProfileStudentComponent} from './profile-student/profile-student.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {HomeComponent} from './home/home.component';
import {VerificationComponent} from './verification/verification.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {SidebarComponent} from './sidebar/sidebar.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AuthInterceptor} from "./services/AuthInterceptor";
import {RatingModule} from "ng-starrating";

import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ArticlesComponent } from './articles/articles.component';
import {MatChipsModule} from "@angular/material/chips";
import { ArticleComponent } from './article/article.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";

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
    ArticleComponent
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
      MatSnackBarModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },{
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {duration: 2500}
  }],
  bootstrap: [AppComponent],
  entryComponents:[DialogComponent]
})
export class AppModule {
}

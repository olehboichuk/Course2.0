import {Component, OnInit} from '@angular/core';
import {LoginModel} from '../models/login.model';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public error = '';
  public loading = false;
  public roles: string[];

  constructor(
    private loginService: AuthService,
    private userService: UserService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  onSubmit() {
    this.do_login();
  }

  public do_login(): void {
    const user = {
      login: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value
    } as LoginModel;
    this.loading = true;
    this.loginForm.controls.login.disable();
    this.loginForm.controls.password.disable();
    this.loginService.login(user)
      .subscribe(data => {
          if (data.active) {
            console.log(data);
            for (const i in data.roles) {
              // @ts-ignore
              this.roles[i] = data.roles[i].name;
            }
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', this.roles.includes('TEACHER')?'TEACHER':'STUDENT');
            localStorage.setItem('login', data.login);
            this.userService.getUserRole().subscribe(res => {
              this.loginService._logInUser = true;
              if (this.roles.includes('TEACHER')) {
                this.router.navigate(['/teacher-profile']);
              } else {
                this.router.navigate(['/student-profile']);
              }
            });
          } else {
            this.router.navigate(['/']);
          }
        },
        error => {
          if (error.error.message) {
            this.error = error.error.message;
          } else {
            this.error = 'No Internet connection';
          }
          this.loading = false;
          this.loginForm.controls.login.enable();
          this.loginForm.controls.password.enable();
        });
  }

  ngOnInit() {
    this.roles = [];
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}

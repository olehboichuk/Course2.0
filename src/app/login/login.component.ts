import {Component, OnInit} from '@angular/core';
import {LoginModel} from "../models/login.model";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private error = '';
  private loading = false;
  private roles:string[];

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
    const user = <LoginModel>{
      login: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value
    };
    this.loading = true;
    this.loginForm.controls['login'].disable();
    this.loginForm.controls['password'].disable();
    this.loginService.login(user)
      .subscribe(data => {
        console.log(data.active);
          if (data.active) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("expires_at", JSON.stringify(data.expiresIn));
            localStorage.setItem("role", data.role);
            this.userService.getUserRole().subscribe(res => {
              console.log(res)
              for (let i in res){
                this.roles[i]=res[i].name;
              }
              this.loginService._logInUser = true;
              if (this.roles.includes("TEACHER")) {
                this.router.navigate(['/teacher-profile']);
              } else if (this.roles.includes("ADMIN")) {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/student-profile']);
              }
            });
          }else {
            this.router.navigate(['/']);
          }
        },
        error => {
          if (error.error.message)
            this.error = error.error.message;
          else
            this.error = 'No Internet connection'
          this.loading = false;
          this.loginForm.controls['login'].enable();
          this.loginForm.controls['password'].enable();
        });
  }

  ngOnInit() {
    this.roles=[];
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}

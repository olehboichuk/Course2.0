import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {UserModel} from "../models/user.model";
import {ErrorStateMatcher} from "@angular/material/core";
import {LanguagesList} from "../models/languagesList";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.scss']
})
export class RegisterTeacherComponent implements OnInit {
  registerForm: FormGroup;
  public loading = false;
  public password: string;
  matcher = new MyErrorStateMatcher();
  private languages: LanguagesList [];
  public hidePassword = true;
  public hideConfirm = true;
  private error = '';


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      about: [''],
      languages: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    this.authService.getLanguages()
      .subscribe(
        languages => {
          this.languages = languages;
        });
  }

  onSubmit() {
    this.do_register();
  }

  public do_register(): void {
    let langList: number[] = [];
    for (let i in this.registerForm.get('languages').value) {
      langList[i] = this.registerForm.get('languages').value[i].id;
    }
    const user = <UserModel>{
      login: this.registerForm.get('login').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      first_name: this.registerForm.get('firstName').value,
      last_name: this.registerForm.get('lastName').value,
      about: this.registerForm.get('about').value,
      languageIds: langList,
      role: ['STUDENT','TEACHER'],
    };
    this.loading = true;
    this.registerForm.controls['login'].disable();
    this.registerForm.controls['firstName'].disable();
    this.registerForm.controls['lastName'].disable();
    this.registerForm.controls['email'].disable();
    this.registerForm.controls['password'].disable();
    this.registerForm.controls['confirmPassword'].disable();
    this.authService.registerUser(user)
      .subscribe(data => {
          console.log('success');
          this.router.navigate(['/login']);
        },
        error => {
          if(error.error.message)
            this.error = error.error.message;
          else
            this.error = 'No Internet connection'
          console.warn('REGISTRATION DOESN`T WORK');
          this.loading = false;
          this.registerForm.controls['login'].enable();
          this.registerForm.controls['firstName'].enable();
          this.registerForm.controls['lastName'].enable();
          this.registerForm.controls['email'].enable();
          this.registerForm.controls['password'].enable();
          this.registerForm.controls['confirmPassword'].enable();
        });
  }

}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  }
}

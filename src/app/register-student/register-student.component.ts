import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ErrorStateMatcher} from "@angular/material/core";
import {UserModel} from "../models/user.model";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {
  registerForm: FormGroup;
  public loading = false;
  public password: string;
  matcher = new MyErrorStateMatcher();
  public hidePassword = true;
  public hideConfirm = true;
  private error = '';


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      login: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit() {
    this.do_register();
  }

  public do_register(): void {
    const user = <UserModel>{
      login: this.registerForm.get('login').value,
      email: this.registerForm.get('email').value,
      role: ['STUDENT'],
      password: this.registerForm.get('password').value,
      first_name: this.registerForm.get('first_name').value,
      last_name: this.registerForm.get('last_name').value,
      about: '',
    };
    this.loading = true;
    this.registerForm.controls['login'].disable();
    this.registerForm.controls['first_name'].disable();
    this.registerForm.controls['last_name'].disable();
    this.registerForm.controls['email'].disable();
    this.registerForm.controls['password'].disable();
    this.registerForm.controls['confirmPassword'].disable();
    this.authService.registerUser(user)
      .subscribe(data => {
          console.log('success');
          this.router.navigate(['/login']);
          console.error(data);
        },
        error => {
          if(error.error.message)
            this.error = error.error.message;
          else
            this.error = 'No Internet connection'
          console.warn('REGISTRATION DOESN`T WORK');
          console.error(error);
          this.loading = false;
          this.registerForm.controls['login'].enable();
          this.registerForm.controls['first_name'].enable();
          this.registerForm.controls['last_name'].enable();
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

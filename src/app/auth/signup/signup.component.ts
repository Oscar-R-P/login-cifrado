import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/database.service';
import { emailDomainValidator, validPassword } from 'src/app/shared/custom-validators.directive';
import { User } from 'src/app/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private dbService: DatabaseService) { }

  loginForm!: FormGroup

  user: User = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };
  

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      name: new FormControl(this.user.name,[Validators.required,Validators.minLength(4)]),
      email: new FormControl(this.user.email,[Validators.required,Validators.email,emailDomainValidator()]),
      phone: new FormControl(this.user.phone,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]),
      password: new FormControl(this.user.password,[Validators.required,Validators.minLength(10),validPassword()]),
    });
  }

  onSubmit() {
    this.loginForm.value.name = this.loginForm.value.name.trim();
    this.loginForm.value.email = this.loginForm.value.email.trim();
    this.loginForm.value.phone = this.loginForm.value.phone.trim();
    this.loginForm.value.password = this.loginForm.value.password.trim();

    this.dbService.signup(this.loginForm.value).subscribe((data: any) => {
      console.log(data["msg"]);
    });
    console.log(this.loginForm.value);
  }

  get name() {
    return this.loginForm.get('name');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get phone() {
    return this.loginForm.get('phone');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

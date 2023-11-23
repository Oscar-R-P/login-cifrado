import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';
import { emailDomainValidator, validPassword } from 'src/app/shared/custom-validators.directive';
import { User } from 'src/app/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private dbService: DatabaseService,private router: Router) { }

  loginForm!: FormGroup

  user: User = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };


  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl(this.user.email, [Validators.required, Validators.email, emailDomainValidator()]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(10), validPassword()]),
    });
  }

  onSubmit() {
    this.loginForm.value.email = this.loginForm.value.email.trim();
    this.loginForm.value.password = this.loginForm.value.password.trim();

    this.dbService.signin(this.loginForm.value).subscribe((data: any) => {
      console.log(data["user"]);
      if (data.user) {
        console.log("Usuario encontrado");
        this.router.navigate(['/landing']);
      }
    });
    console.log(this.loginForm.value);
  }

  onClick() {
    this.loginForm.value.email = this.loginForm.value.email.trim();
    this.loginForm.value.password = this.loginForm.value.password.trim();

    this.dbService.signinAsimetrico(this.loginForm.value).subscribe((data: any) => {
      console.log(data["user"]);
      if (data.user) {
        console.log("Usuario encontrado");
        this.router.navigate(['/landing']);
      }
    });
    console.log(this.loginForm.value);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

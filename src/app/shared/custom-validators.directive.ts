import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appCustomValidators]'
})
export class CustomValidatorsDirective {

  constructor() { }

  

}

export function validPassword(): ValidatorFn {
 return (control: AbstractControl): ValidationErrors | null => {
   const hasNumber = /\d/.test(control.value);
   const hasSpecialCharacter = /[!@#$%^&*]/.test(control.value);
   const hasLetter = /[a-zA-Z]/.test(control.value);
   const isValid = hasNumber && hasSpecialCharacter && hasLetter;
   return isValid ? null : { invalidPassword: {value:control.value} };
 }
}

export function emailDomainValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
  const email = control.value;
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  const valid = emailRegex.test(email);
  return valid ? null : {invalidEmail: {value:control.value}};
  }
}
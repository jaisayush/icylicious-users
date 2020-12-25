import { AbstractControl, ValidationErrors } from "@angular/forms"
export const PasswordStrengthValidator=function (control:AbstractControl):ValidationErrors | null{
    let value:string=control.value || '';
    if(!value){
        return null
    }

    let upperCaseCharacters = /[A-Z]+/g
  if (upperCaseCharacters.test(value) === false) {
    return { passwordStrength: `password has to contain Upper case characters` };
  }

  let lowerCaseCharacters = /[a-z]+/g
  if (lowerCaseCharacters.test(value) === false) {
    return { passwordStrength: `password has to contain lower case characters` };
  }

  let space=' ';
  if(value.indexOf(space)>=0){
    return { passwordStrength: `password should not contain spaces` };
  }
   
  let numberCharacters = /[0-9]+/g
  if (numberCharacters.test(value) === false) {
    return { passwordStrength: `password has to contain numbers ` };
  }

  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  if (specialCharacters.test(value) === false) {
    return { passwordStrength: `password has to contain special character` };
  }
  if(value.length<8){
    return { passwordStrength: `length should be minimum 8 characters` };
  }
  return null;
}
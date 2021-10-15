import { AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { of, timer } from 'rxjs';

import { AccountService } from '../account.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  errors: string[];

  constructor(private fb:FormBuilder, private accountservice:AccountService,private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm()
  {
    this.registerForm = this.fb.group({
      displayName:[null, [Validators.required]],
      email:[null, [Validators.required,Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')],
    [this.validationEmailNotTaken()]],
      password:[null,[Validators.required]]
    });
  }
  OnSubmit()
  {
    this.accountservice.register(this.registerForm.value).subscribe(response =>
      {
        this.router.navigateByUrl('/shop');
      },
      error =>{
        console.log(error);
        this.errors=error.errors;

      });
  }

  validationEmailNotTaken(): AsyncValidatorFn{
    return control =>{
      return timer(500).pipe(
        switchMap(()=>{
if(!control.value){
  return of(null);
}
return this.accountservice.checkEmailExists(control.value).pipe(
  map(res => {
    return res ? {emailExists: true} : null;
  })
);
        })
      );
    }
  }


}

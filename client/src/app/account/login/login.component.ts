import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  returnUrl:string;

  constructor(private accountService: AccountService,private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl=this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
    this.createLoginForm();
  }

  createLoginForm()
  {
    this.loginForm = new FormGroup({
      email:new FormControl('',[Validators.required]),    //,Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]),
      password: new FormControl('',Validators.required)
    });
  }
  OnSubmit()
  {
    this.accountService.login(this.loginForm.value).subscribe(()=>
{

this.router.navigateByUrl(this.returnUrl);
  },
  error => {
    console.log(error);
  });
  }

}

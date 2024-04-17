import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { Customer } from 'src/app/model/customer'; 
import { LoginValidators } from 'src/app/validators/login.validator'; 
import { LoginService } from './login.service'; 

@Component({
selector: 'login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

customer!: Customer;
loginForm!: FormGroup;
errorMessage!: string;
successMessage!: string;
tryToLogin: boolean = false;
constructor(private fb: FormBuilder, private loginService: LoginService,
  private router: Router) {
  
  }

ngOnInit(): void {
  this.customer = new Customer();
  this.createForm()
}

createForm() {

  this.loginForm = this.fb.group({
    emailId: [this.customer.emailId, [Validators.required, LoginValidators.validateEmailId], ""],
    password: [this.customer.password, [Validators.required,], ""]
  });
}

login() {
  this.tryToLogin = true;
  this.errorMessage = "";
  this.successMessage = "";
  this.customer = this.loginForm.value as Customer;
  this.loginService.login(this.customer).subscribe(

    (response) => {

      this.customer = response
      sessionStorage.setItem("customer", JSON.stringify(this.customer));
      this.tryToLogin = false;
      this.router.navigate(['/home']);
    },
    (error) => {
      console.log("hi" + error)
      this.tryToLogin = false;
      this.errorMessage = <any>error;
    }
  )
}
}

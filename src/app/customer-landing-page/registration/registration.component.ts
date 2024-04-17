import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Customer } from "src/app/model/customer";
import { LoginValidators } from "../../validators/login.validator";
import { RegistrationService } from "./registration.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  customer!: Customer;
  registerUserForm!: FormGroup;
  errorMessage!: string;
  successMessage!: string;
  constructor(private fb: FormBuilder, private registerService: RegistrationService){

  }

  ngOnInit(){
    this.customer = new Customer();
    this.createForm();

  }

  createForm(){

    this.registerUserForm = this.fb.group({
      emailId: [this.customer.emailId, [Validators.required, LoginValidators.validateEmailId]],
      name: [this.customer.name, [Validators.required, LoginValidators.validateName]],
      phoneNumber: [this.customer.phoneNumber, [Validators.required, LoginValidators.validatePhoneNumber]],
      address: [this.customer.address, [Validators.required]],
      password: [this.customer.password, [Validators.required, LoginValidators.validatePassword]],
      confirmPassword: ["", [Validators.required, LoginValidators.confirmPassword]]            
    });

  }

  registerUser() {
    this.errorMessage = "";
    this.successMessage = "";
    this.customer = this.registerUserForm.value as Customer;

    this.registerService.registerCustomer(this.customer).
    subscribe(
      message => {
        this.successMessage = message;
        this.registerUserForm.reset();
      },
      error => this.errorMessage = <any>error
    )
  }

}


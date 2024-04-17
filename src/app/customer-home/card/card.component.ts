import { Component, OnInit } from '@angular/core';
import { CardService } from './card.service';
import { Customer } from 'src/app/model/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from 'src/app/model/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{

  card!: Card;
  cardForm!: FormGroup;
  errorMessage!: string;
  successMessage!: string;
  loggedInCustomer!: Customer;

  constructor(private fb: FormBuilder, private cardService: CardService) {}

  ngOnInit(): void {
    this.card = new Card();
    this.createCardForm();
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem('customer') || "{}");
  }

  createCardForm() {

    this.cardForm = this.fb.group({

      cardType:   [this.card.cardType, [Validators.required]],
      cardNumber: [this.card.cardNumber, [Validators.required]],
      nameOnCard: [this.card.nameOnCard, [Validators.required]],
      cvv:        [this.card.cvv, [Validators.required]],
      expiryDate: [this.card.expiryDate, [Validators.required]],
    });

  }

  addCardsOfCustomer() {
    this.errorMessage = "";
    this.successMessage = "";
    this.card = this.cardForm.value as Card;

    this.cardService.addCardsOfCustomer(this.card, this.loggedInCustomer.emailId).subscribe(
      response => {
        this.successMessage = response,
        this.card = response,
        sessionStorage.setItem("card", JSON.stringify(this.card));
        console.log(response)
        this.cardForm.reset()
        
      },
      error => this.errorMessage = <any>error
    )

    
  }




}

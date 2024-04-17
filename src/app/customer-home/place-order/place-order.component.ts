import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/model/card';
import { PlaceOrderService } from './place-order.service';
import { CustomerHomeService } from '../customer-home.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit{

  cart: any;
  grandTotal: any = 0;
  cardType1: string = "DEBIT_CARD";
  cardType2: string = "CREDIT_CARD";
  cardList1: Card[] = [];
  cardList2: Card[] = [];
  selectedCard!: Card;
  viewCardDetails: boolean = false;
  successMessage!: any;
  errorMessage!: any;
  loggedInCustomer!: any;
  selectedI1: any = null;
  selectedI2: any = null;
  cvvg: any = null;
  orderId: any = null;
  showError!: any;
  details1!: any;
  details2!: any;
  date!: Date;
  confirmOrder1: boolean = false;
  confirmOrder2: boolean = false;
  popUp: boolean = false;

  constructor(private router: Router,
    private placeOrderService: PlaceOrderService,
    private customerHomeService: CustomerHomeService) {

  }
  ngOnInit(): void {
    this.selectedI1 = null;
    this.selectedI2 = null;

    this.confirmOrder1 = false;
    this.confirmOrder2 = false;

    this.cart = JSON.parse(sessionStorage.getItem("cart") || "{}");

    this.cart.forEach((element: { product: { price: number; discount: number; }; quantity: number; }) => {
      this.grandTotal += (element.product.price -
        (element.product.price * element.product.discount) / 100) * element.quantity;
    });

    this.loggedInCustomer = JSON.parse(sessionStorage.getItem('customer') || "{}");

    this.placeOrderService.getCards(this.loggedInCustomer.emailId, this.cardType1).subscribe(
      card1 => {
        this.cardList1 = card1;
        sessionStorage.setItem("card1", JSON.stringify(this.cardList1));
        this.customerHomeService.updateCardList(this.cardList1);
      }, error => {
        this.customerHomeService.updatedCardList.subscribe(cardList1 => this.cardList1 = cardList1);
      }
    )

    // similar to Debit Card, write a logic to get the Credit Card Details
    this.placeOrderService.getCards(this.loggedInCustomer.emailId, this.cardType2).subscribe(
      card2 => {
        this.cardList2 = card2;
        sessionStorage.setItem("card2", JSON.stringify(this.cardList2));
        this.customerHomeService.updateCardList(this.cardList2);
      }, error => {
        this.customerHomeService.updatedCardList.subscribe(cardList2 => this.cardList2 = cardList2)
      }
    )
  }

  selectExistingCards1(i1: any) {
    this.selectedI1 = i1;
    this.selectedI2 = null;
    this.cvvg = null;
    this.orderId = null;
    this.successMessage = "";
    this.errorMessage = "";
  }

  selectExistingCards2(i2: any) {
    this.selectedI1 = null;
    this.selectedI2 = i2;
    this.cvvg = null;
    this.orderId = null;
    this.successMessage = "";
    this.errorMessage = "";
  }


  validation() {
    this.successMessage = "";
    this.errorMessage = "";
    if(this.cvvg > 999 || this.cvvg < 100) {
      this.showError = "CVV should be of 3 digit";
    }
    else if(this.cvvg == null) {
      this.showError = "Required";
    }
    else {
      this.showError = null;
    }
  }

  placeOrder(card: Card){
    this.successMessage = "";
    this.errorMessage = "";

    let date1 = new Date();
    date1.setDate(date1.getDate() + 7);
    this.date = date1;

    // this.selectedCard = card;
    this.details1 = {
      customerEmailId: this.loggedInCustomer.emailId,
      dateOfOrder: new Date(),
      totalPrice: this.grandTotal,
      orderStatus: "PLACED",
      discount: 0,
      paymentThrough: card.cardType,
      dateOfDelivery: date1,
      deliveryAddress: this.loggedInCustomer.deliveryAddress

    };

    this.placeOrderService.placeOrder(this.details1).subscribe (
      success => {
        this.successMessage = success;
      },
      error => {
        this.errorMessage = error.errorMessage;
        console.log(error);
      }
    );
  }

  makePayment(card: Card) {
    this.successMessage = "";
    this.errorMessage = "";
    this.details1 = {
      cardType: card.cardType,
      cardNumber: card.cardNumber,
      nameOnCard: card.nameOnCard,
      hashCvv: card.hashCvv,
      cvv: this.cvvg,
      expiryDate: card.expiryDate,
      cardId: card.cardId,
      customerEmailId: card.customerEmailId
    }

    this.placeOrderService.payForOrder(this.loggedInCustomer.emailId, this.orderId, this.details1).subscribe(
      (success) => {
        this.successMessage = success;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
    
  }

  addCard() {
    this.router.navigate(["home/card"]);
  }

  goToOrders() {
    this.router.navigate(["home/viewOrder"]);
  }

}

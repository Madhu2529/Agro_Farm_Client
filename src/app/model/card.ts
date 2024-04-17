export class Card {
    cardType!: 'DEBIT_CARD' | 'CREDIT_CARD';
    cardNumber!: string;
    nameOnCard!: string;
    hashCvv!: string;
    cvv!: number;
    expiryDate!: Date;
    cardId!: number;
    customerEmailId!: string;
}
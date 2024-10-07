import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  paymentRequest: any = {
    paymentType: '',
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: 0
  };

  paymentResponse: any = null;

  constructor(private http: HttpClient) {}

  onPaymentTypeChange() {
    // Reset fields when payment type changes
    this.paymentRequest.upiId = '';
    this.paymentRequest.cardNumber = '';
    this.paymentRequest.expiryDate = '';
    this.paymentRequest.cvv = '';
  }

  onSubmit() {
    const apiUrl = 'http://localhost:8088/api/payment/process'; // URL to your backend API

    this.http.post(apiUrl, this.paymentRequest).subscribe((response: any) => {
      this.paymentResponse = response;
    }, (error) => {
      console.error('Error during payment processing:', error);
    });
  }
}

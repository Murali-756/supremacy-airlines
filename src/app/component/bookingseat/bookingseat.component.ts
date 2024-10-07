import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingResponse } from '../../bookingresponse';
import { BookingService } from '../../service/booking.service';
import { BookingRequest } from '../../bookingrequest';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookingseat',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './bookingseat.component.html',
  styleUrl: './bookingseat.component.css'
})
export class BookingseatComponent {

  bookingForm: FormGroup;
  bookingResponse: BookingResponse | null = null;
  errorMessage: string | null = null;
 message:string | null=null;
  constructor(private bookingService: BookingService, private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      flightId: [null, Validators.required],
      passengers: this.fb.array([this.createPassenger()])
    });
  }

  createPassenger(): FormGroup {
    return this.fb.group({
      seatNumber: ['', Validators.required],
      passengerName: ['', Validators.required],
      passengerEmail: ['', [Validators.required, Validators.email]],
      passengerPhoneNumber: ['', Validators.required]
    });
  }

  get passengers(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  addPassenger() {
    this.passengers.push(this.createPassenger());
  }

  removePassenger(index: number) {
    this.passengers.removeAt(index);
  }


  onSubmit() {
    if (this.bookingForm.valid) {
      const flightId = this.bookingForm.value.flightId;
      const bookingRequests: BookingRequest[] = this.bookingForm.value.passengers.map((passenger: any) => ({
        seatNumber: passenger.seatNumber,
        passengerName: passenger.passengerName,
        passengerEmail: passenger.passengerEmail,
        passengerPhoneNumber: passenger.passengerPhoneNumber,
      }));

      this.bookingService.bookSeats(flightId, bookingRequests).subscribe(
        response => {
          this.bookingResponse = response;
          this.message="Continue To payment"
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = error;
          this.bookingResponse = null;
        }
      );
    }
  }
}

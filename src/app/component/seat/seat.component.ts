import { Component } from '@angular/core';
import { SeatService } from '../../service/seat.service';
import { Seat } from '../../seat';
import { BookingRequest } from '../../bookingrequest';
import { BookingResponse } from '../../bookingresponse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.css'
})
export class SeatComponent {
  flightId: number | any;
  seats: Seat[] = [];
  newSeats: Seat[] = [];
  bookingRequests: BookingRequest[] = [];
  bookingResponse: BookingResponse | any;

  constructor(private seatService: SeatService) {}

 /*addSeats() {
    this.seatService.addSeats(this.flightId, this.newSeats).subscribe(
      response => {
        this.seats = response;
        this.newSeats = []; // Clear the input after adding
      },
      error => {
        console.error('Error adding seats', error);
      }
    );
  }*/

  getSeats() {
    this.seatService.getSeatsByFlightId(this.flightId).subscribe(
      response => {
        this.seats = response;
      },
      error => {
        console.error('Error fetching seats', error);
      }
    );
  }
  
 /* bookSeats() {
    this.seatService.bookSeats(this.flightId, this.bookingRequests).subscribe(
      response => {
        this.bookingResponse = response;
      },
      error => {
        console.error('Error booking seats', error);
      }
    );
  }*/
}

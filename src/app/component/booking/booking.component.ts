import { Component } from '@angular/core';
import { Booking } from '../../booking';
import { BookingService } from '../../service/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  booking: Booking = {
    flightId: 0,
    numberOfSeats: 0,
    adultPassengers: 0,
    childPassengers: 0,
    infantPassengers: 0,
    bookingDate: new Date().toISOString() // Default to now
  };
  bookingId: number | null = null;
  message: string = '';
  

  constructor(private bookingService: BookingService) { }

  createBooking() {
    this.bookingService.createBooking(this.booking).subscribe()
      
        this.message = 'Continue to select seat';// Success message
      
      
        (error: any) => {
          this.message = 'Error Booking';
          
        }
    
  }

  deleteBooking() {
    if (this.bookingId) {
      this.bookingService.deleteBooking(this.bookingId).subscribe()
       
        this.message = 'Booking Stopped successfully!';
          this.bookingId = null; // Reset bookingId
        // Clear retrieved booking
        (error: any) => {
          this.message = ' Booking Not stopped';
          
        }
    }
  }
}

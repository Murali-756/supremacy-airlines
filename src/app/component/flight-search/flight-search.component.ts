import { Component } from '@angular/core';
import { FlightService } from '../../service/flight.service';
import { Flight } from '../../flight';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent  {
  source: string = '';
  destination: string = '';
  departureDate: string = '';
  returnDate?: string = '';
  flights: Flight[] = [];
  message: string = '';

  constructor(private flightService: FlightService) {}
  
  searchFlights() {
    this.flightService.searchFlights(this.source, this.destination, this.departureDate, this.returnDate ).subscribe(
      (data) => {
        this.flights = data;
        if (this.flights.length === 0) {
          this.message = 'No flights found.';
        } else {
          this.message = '';
        }
      },
      (error) => {
        this.message = 'Error fetching flights.';
      }
    );
  }
}

    
  


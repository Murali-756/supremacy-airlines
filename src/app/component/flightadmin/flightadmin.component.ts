import { Component, OnInit } from '@angular/core';
import { Flight } from '../../flight';
import { FlightService } from '../../service/flight.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SeatService } from '../../service/seat.service';
import { Seat } from '../../seat';


@Component({
  selector: 'app-flightadmin',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './flightadmin.component.html',
  styleUrl: './flightadmin.component.css'
})
export class FlightAdminComponent implements OnInit {
  flights: Flight[] = [];
  newFlight: Flight = {
    id:'' ,
    flightNumber: '',
    source: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    availableSeats: 0,
    fare: 0,
    flightClass: ''
  
  };
  flight: Flight[] = [];
  showFlightList: boolean = false;
  flightId: number | any;
  seats: Seat[] = [];
  newSeats: Seat[] = [];
  showAddSeat: boolean = false;

  constructor(private flightService: FlightService,
    private router:Router,private seatService:SeatService
  ) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    this.flightService.viewFlights().subscribe(flights => {
      this.flights = flights;
    });
  }

  addFlight(): void {
    this.flightService.addFlight(this.newFlight).subscribe(() => {
      this.loadFlights();
      this.newFlight = {
        id:'',
        flightNumber: '',
        source: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        availableSeats: 0,
        fare: 0,
        flightClass: ''
      }; // Reset form
    });
  }

  deleteFlight(id: number): void {
    this.flightService.deleteFlight(id).subscribe(() => {
      this.loadFlights();
    });
  }
  viewFlights() {
    this.router.navigate(['/flight-list']);
  }

  toggleFlightList() {
    this.showFlightList = !this.showFlightList;
  }

  toggleAddSeat() {
    this.showAddSeat = !this.showAddSeat;
  }
  addSeats() {
    this.seatService.addSeats(this.flightId, this.newSeats).subscribe(
      response => {
        this.seats = response;
        this.newSeats = []; // Clear the input after adding
      },
      error => {
        console.error('Error adding seats', error);
      }
    );
  }
  AddSeats() {
    this.router.navigate(['/add-seat']);
  }

  cancel() {
    this.router.navigate(['/login']); // Adjust the path as needed
  }

}



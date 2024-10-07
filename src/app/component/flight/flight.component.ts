import { Component, OnInit } from '@angular/core';
import { Passenger } from '../../passenger';
import { FlightService } from '../../service/flight.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent implements OnInit {
  passengers: Passenger[] = [];
  selectedSeatId: number | null = null;
  errorMessage: string | null = null;

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.getAllPassengers();
  }

  getAllPassengers(): void {
    this.flightService.getAllPassengers().subscribe(
      (data: Passenger[]) => {
        this.passengers = data;
      },
      (error: string) => {
        this.errorMessage = error;
      }
    );
  }

  getPassengersBySeatId(): void {
    if (this.selectedSeatId) {
      this.flightService.getPassengersBySeatId(this.selectedSeatId).subscribe(
        (data: Passenger[]) => {
          this.passengers = data;
        },
        (error: string) => {
          this.errorMessage = error;
        }
      );
    }
  }
}

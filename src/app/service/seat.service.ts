import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seat } from '../seat';
import { BookingResponse} from '../bookingresponse';
import { BookingRequest } from '../bookingrequest';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private baseUrl = 'http://localhost:8088/api/flights';

  constructor(private http: HttpClient) {}

  addSeats(flightId: number, seats: Seat[]): Observable<Seat[]> {
    return this.http.post<Seat[]>(`${this.baseUrl}/${flightId}/addseat`, seats);
  }

  getSeatsByFlightId(flightId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.baseUrl}/${flightId}/seat`);
  }

  bookSeats(flightId: number, bookingRequests: BookingRequest[]): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${this.baseUrl}/${flightId}/book`, bookingRequests);
  }
}

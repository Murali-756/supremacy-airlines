import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Booking } from '../booking';
import { BookingResponse } from '../bookingresponse';
import { BookingRequest } from '../bookingrequest';
 // Adjust the path based on your project structure

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8088/api/bookings'; // Update with your API URL

  constructor(private http: HttpClient) { }

  createBooking(booking: Booking): Observable<string> {
    return this.http.post<string>(this.apiUrl, booking);
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  deleteBooking(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`);
  }

  private apiUrl1 = 'http://localhost:8088/api/flights'

  bookSeats(flightId: number, bookingRequests: BookingRequest[]): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${this.apiUrl1}/${flightId}/book`, bookingRequests)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('An error occurred: ' + (error.error.message || error.message));
  }
}

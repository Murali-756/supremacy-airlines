import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Flight } from '../flight';
import { Passenger } from '../passenger';
// Import your Flight model

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private baseUrl: string = 'http://localhost:8088/api/flights';

  constructor(private http: HttpClient) {}

  addFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(`${this.baseUrl}/add`, flight);
  }

  deleteFlight(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`);
  }

  viewFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.baseUrl}/view`);
  }

  private apiUrl1 = 'http://localhost:8088/api/flights';

  searchFlights(source: string, destination: string, departureDate: string, returnDate?: string): Observable<Flight[]> {
    let params = new HttpParams()
      .set('source', source)
      .set('destination', destination)
      .set('departureDate', departureDate);

    if (returnDate) {
      params = params.set('returnDate', returnDate);
    }

    return this.http.get<Flight[]>(`${this.apiUrl1}/search`, { params });
  }


  searchFlightsByWay(source: string, destination: string): Observable<Flight[]> {
    const params = new HttpParams()
      .set('source', source)
      .set('destination', destination);

    return this.http.get<Flight[]>(`${this.apiUrl1}/search/sd`, { params });
  }

  searchFlightsByDate(departureDate: string, returnDate: string): Observable<Flight[]> {
    const params = new HttpParams()
      .set('departureDate', departureDate)
      .set('returnDate', returnDate);

    return this.http.get<Flight[]>(`${this.apiUrl1}/search/t`, { params });
  }

   // Get all passengers
   getAllPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`${this.baseUrl}/details`)
      .pipe(catchError(this.handleError));
  }

  // Get passengers by seat ID
  getPassengersBySeatId(seatId: number): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`${this.baseUrl}/passenger/${seatId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}


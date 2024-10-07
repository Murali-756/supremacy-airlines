export interface Flight {
    id?: number | any;
    flightNumber: string;
    source?: string;
    destination?: string;
    departureDate?: string; // Use ISO date string format
    returnDate ?: string; // Use ISO date string format
    availableSeats: number;
    fare: number;
    flightClass: string;
  }
  
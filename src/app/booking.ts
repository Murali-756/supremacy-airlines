export interface Booking {
    id?: number; // Optional for new bookings
    flightId: number; // Assuming the flight is selected by ID
    numberOfSeats: number;
    adultPassengers: number;
    childPassengers: number;
    infantPassengers: number;
    bookingDate: string; // Use ISO date string format
  }  
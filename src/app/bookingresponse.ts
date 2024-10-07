import { SeatBookingDetail } from "./seat-booking-detail";

export interface BookingResponse {
    status: string;
    totalAmount: number;
    bookedSeats:SeatBookingDetail[];
    message: string;
}
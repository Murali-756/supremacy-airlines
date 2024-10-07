import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { FlightAdminComponent } from './component/flightadmin/flightadmin.component';
import { FlightSearchComponent } from './component/flight-search/flight-search.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { BookingComponent } from './component/booking/booking.component';
import { SeatComponent } from './component/seat/seat.component';
import { BookingseatComponent } from './component/bookingseat/bookingseat.component';
import { PaymentComponent } from './component/payment/payment.component';
import { AboutusComponent } from './component/aboutus/aboutus.component';
import { LogoutComponent } from './component/logout/logout.component';
import { FlightComponent } from './component/flight/flight.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'register',component: RegisterComponent},
    {path:'login',component: LoginComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent },  // Add this route
    { path: 'flights', component: FlightAdminComponent },
    { path: 'search', component: FlightSearchComponent }, 
    { path: '', redirectTo: '/bookings', pathMatch: 'full' }, // Redirect to bookings on startup
    { path: 'bookings', component: BookingComponent }, // Route for the Booking component
    { path: 'flight', component: FlightComponent},
    
    // Add more routes here as needed

    { path: 'add-seats', component:SeatComponent},
  // Route for seat selection if applicable
  { path: 'book', component: BookingseatComponent },
  {path: 'payment',component: PaymentComponent},
  { path: 'aboutus', component: AboutusComponent },
  { path: 'logout', component: LogoutComponent }
];

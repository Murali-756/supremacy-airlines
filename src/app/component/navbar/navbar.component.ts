import { Component } from '@angular/core';
import { LoginServiceService } from '../../service/login-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  username :string='';
  isUserLoggedIn:boolean=false; 
  
  //DI of AuthenticationService Using Constructor
  constructor(public logService: LoginServiceService) {  }
  
  ngOnInit() {
    // Subscribe to userName$ observable to get updates dynamically
    this.logService.userName$.subscribe((email: string) => {
      this.username = email;
      this.isUserLoggedIn = this.logService.isLoggedIn();
    });
  }

  handleLogout(){
    this.logService.logout();
  }
}

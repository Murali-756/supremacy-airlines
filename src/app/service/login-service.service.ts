import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private apiUrl = 'http://localhost:8088/api/user';  // Backend API URL
 
  // BehaviorSubject to track user email
private userNameSubject = new BehaviorSubject<string>('');
userName$ = this.userNameSubject.asObservable();  // Observable to subscribe to

  constructor(private http:HttpClient,private router:Router) {
    if (typeof window !== 'undefined') { // Check if window is available
      // Initialize username on service creation
     const email = sessionStorage.getItem('userEmail');
     if (email) {
       this.userNameSubject.next(email);
     }
   }
  }

  // Method for user login
  loginUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  setSession(token: string, email: string): void {
    sessionStorage.setItem('authToken', token);  // Save token in localStorage
    sessionStorage.setItem('userEmail', email); // Store email in localStorage
    console.log('Token stored:', sessionStorage.getItem('authToken'));  // Debugging
    console.log('Email stored:', sessionStorage.getItem('userEmail'));  // Debugging
 
    // Update BehaviorSubject so subscribers get the latest email
    this.userNameSubject.next(email);
  }

// Check if a session exists
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
    let token=sessionStorage.getItem('authToken');
    console.log('Token :'+token);
    return token !== null;
  } 
  return false;  // Return false if window is not available
}

  getLoggedInUserName(){
  return this.userNameSubject.value;
}

  // Logout functionality: Clear session data
  logout(): void {
    if (typeof window !== 'undefined') {
    sessionStorage.removeItem('authToken');  // Clear token from localStorage
    sessionStorage.removeItem('userEmail');  // Clear email from sessionStorage
      
    // Reset BehaviorSubject after logout
    this.userNameSubject.next('');  
  }
    
  }



   // Method for user forgot password
   forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email });
  }

  // Method for user reset password
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { token, newPassword });
  }
  

     
}

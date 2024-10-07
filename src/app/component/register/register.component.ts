import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationServiceService } from '../../service/registration-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registrationForm: FormGroup;
  message: string = '';  // Add the message property here

  constructor(
    private fb: FormBuilder, 
    private registrationService: RegistrationServiceService,
    private router: Router  // Inject Router for redirection
  ) {
    // Initialize the form with validation
    this.registrationForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

   // Handle form submission
   onSubmit() {
    if (this.registrationForm.valid) {

      console.log('Form submitted:', this.registrationForm.value);  // To check if form values are correct
      // Send the form data to the registration service
      this.registrationService.registerUser(this.registrationForm.value).subscribe(
        (response: any) => {
          console.log('User registered successfully!', response);

          // Display the success message
          this.message = 'Registration Successful! Redirecting to login page...';
  
          // Redirect to the login page after 4 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 4000);
  
          // Optionally reset the form after registration
          this.registrationForm.reset();
        },
        (error: any) => {
          console.error('Error registering user', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }
  
  // Helper function to format the date
  formatDate(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    // Return date in yyyy-MM-dd format
    return `${year}-${month}-${day}`;
  }
  
}

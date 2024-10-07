import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  FormsModule,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
  title = 'About Us';
  description = 'We are committed to providing exceptional service and value to our customers.';
  mission = 'To innovate and lead in the transportation industry.';
  vision = 'To be the most trusted and preferred airline choice worldwide.';

  // Feedback Form Variables
  name: string = '';
  email: string = '';
  feedback: string = '';
  submitted: boolean = false;

  onSubmit() {
    console.log('Feedback submitted:', { name: this.name, email: this.email, feedback: this.feedback });
    this.submitted = true;

    // Clear the form after submission
    this.name = '';
    this.email = '';
    this.feedback = '';
  }
}
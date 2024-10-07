import { Component } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../service/login-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userLoginForm: FormGroup;
  adminLoginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
  loginData = { email: '', password: '' };
  errorMessage: string = '';
  successMessage: string = '';

  isUserLogin: boolean = true;  // Flag to toggle between User and Admin login
  isForgotPassword: boolean = false;
  isResetPassword: boolean = false;

  // Admin credentials (static)
  adminCredentials = {
    username: 'Murali123',
    password: 'Murali@123'
  };

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router
  ) {
    // Initialize forms
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.adminLoginForm = this.fb.group({
      adminUsername: ['', Validators.required],
      adminPassword: ['', Validators.required]
    });

    this.forgotPasswordForm = this.fb.group({
      username: ['', Validators.required]
    });

    this.resetPasswordForm = this.fb.group({
      token: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Switch to User Login Form
  showUserLogin() {
    this.isUserLogin = true;
  }

  // Switch to Admin Login Form
  showAdminLogin() {
    this.isUserLogin = false;
  }


  // Switch to Forgot Password Form
  showForgotPassword() {
    this.isForgotPassword = true;
    this.isUserLogin = false;
  }

  // Show Reset Password form (this would be triggered after getting the token)
  showResetPassword() {
    this.isForgotPassword = false;
    this.isResetPassword = true;
  }

  // Handle User Login
 /* onUserLoginSubmit() {
    if (this.userLoginForm.valid) {
      const formData = this.userLoginForm.value;
      this.loginService.loginUser(formData).subscribe(
        (response: any) => {
          console.log('User Login Success', response);
          alert('Login Successful!');
          // Further redirection logic will be added here
        },
        (error: any) => {
          console.error('User Login Failed', error);
          alert('Login Failed. Please check your credentials.');
        }
      );
    }
  }*/

   /* onUserLoginSubmit() {
      if (this.userLoginForm.valid) {
        const formData = this.userLoginForm.value;
        this.loginService.loginUser(formData).subscribe(
          (response: any) => {
            console.log('Login response:', response);
    
            // Check if the response indicates success or failure
            if (response.message === 'Login Successfully') {
              alert('Login Successful!');
              // Redirect or further logic for successful login
            } else {
              alert('Login Failed. Please check your credentials.');
            }
          },
          (error: any) => {
            console.error('Login Error:', error);
            alert('Login Failed. Please check your credentials.');
          }
        );
      }
    }*/

  // Handle Admin Login
  onAdminLoginSubmit() {
    const adminFormData = this.adminLoginForm.value;

    if (
      adminFormData.adminUsername === this.adminCredentials.username &&
      adminFormData.adminPassword === this.adminCredentials.password
    ) {
      console.log('Admin Login Success');
      alert('Admin Login Successful!');
      this.router.navigate(['/flights']); // Adjust the route as needed
      // Further redirection logic for admin will be added here
    } else {
      alert('Invalid Admin Credentials');
    }
  }

 
   // Handle Forgot Password Form Submission
   onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.valid) {
      const formData = this.forgotPasswordForm.value;
      this.loginService.forgotPassword(formData.username).subscribe(
        (response: any) => {
          console.log('Forgot Password Success', response);
          alert('Reset token sent to your email!');
          this.showResetPassword();  // Show reset password form after token generation
        },
        (error: any) => {
          console.error('Forgot Password Failed', error);
          alert('Error sending reset token.');
        }
      );
    }
  }

  // Handle Reset Password Form Submission
  onResetPasswordSubmit() {
    if (this.resetPasswordForm.valid) {
      const formData = this.resetPasswordForm.value;
      this.loginService.resetPassword(formData.token, formData.newPassword).subscribe(
        (response: any) => {
          console.log('Password Reset Success', response);
          alert('Password updated successfully!');
          this.router.navigate(['/login']);  // Redirect to login page
        },
        (error: any) => {
          console.error('Password Reset Failed', error);
          alert('Invalid token or password reset failed.');
        }
      );
    }
  }
/*
  onUserLoginSubmit() {
    if (this.userLoginForm.valid) {
      const formData = this.userLoginForm.value;
      this.loginService.loginUser(formData).subscribe(
        (response: any) => {

              // Start session management
            this.loginService.setSession('some-auth-token', this.loginData.email);
            
            this.successMessage = 'Login Success. Redirecting...'; // Set success message
            setTimeout(() => {
              this.router.navigate(['/']); // Navigate to the dashboard or home page
            },500);
          })
        }
           else {
            alert('Login Failed. Please check your credentials.');
          }
        }
        
    */
  
   onUserLoginSubmit() {
      if (this.userLoginForm.valid) {
        const formData = this.userLoginForm.value;
        this.loginService.loginUser(formData).subscribe(
          (response: any) => {

            // Check if the response indicates success or failure
            if (response.message === 'Login Successfully') {
              alert('Login Successful!');            
            this.loginService.setSession('some-auth-token', this.loginData.email);
              setTimeout(() => {
                this.router.navigate(['/']); // Navigate to the dashboard or home page
              },500);
              // Redirect or further logic for successful login
            } else {
              alert('Login Failed. Please check your credentials.');
            }
          },
          
        );
      }
    }
  
  // Placeholder method for redirection to signup page
      redirectToSignup() {
    this.router.navigate(['/register']);
  }

  // Placeholder method for redirection to forgot password page
  redirectToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

}


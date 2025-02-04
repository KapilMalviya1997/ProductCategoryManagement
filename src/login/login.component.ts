import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  //imports: [],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  constructor(private router: Router) {} 
  // Simulate login function
  onLogin() {
    debugger
    if (this.username === 'admin' && this.password === 'password') {
      alert('Login Successful!');
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials, please try again.');
    }
  }
}

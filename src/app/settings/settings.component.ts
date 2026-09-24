import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  passwordMessage = '';
  passwordError = '';
  usernameMessage = '';
  usernameError = '';

  passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  usernameForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newUsername: ['', Validators.required]
  });

  changePassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    const { currentPassword, newPassword } = this.passwordForm.value;
    this.authService.changePassword(currentPassword!, newPassword!).subscribe({
      next: () => {
        this.passwordMessage = 'Password updated successfully.';
        this.passwordError = '';
        this.passwordForm.reset();
      },
      error: (err) => {
        this.passwordError = err.error?.message || 'Failed to update password';
        this.passwordMessage = '';
      }
    });
  }

  changeUsername() {
    if (this.usernameForm.invalid) {
      this.usernameForm.markAllAsTouched();
      return;
    }
    const { currentPassword, newUsername } = this.usernameForm.value;
    this.authService.updateUsername(newUsername!, currentPassword!).subscribe({
      next: () => {
        this.usernameMessage = 'Username updated successfully.';
        this.usernameError = '';
        this.usernameForm.reset();
      },
      error: (err) => {
        this.usernameError = err.error?.message || 'Failed to update username';
        this.usernameMessage = '';
      }
    });
  }
}
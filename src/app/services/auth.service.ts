import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
 private baseUrl = 'https://asset-backend-3-sd2y.onrender.com/api/auth';

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { username, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
      })
    );
  }

  changePassword(currentPassword: string, newPassword: string) {
    return this.http.post(`${this.baseUrl}/change-password`, { currentPassword, newPassword });
  }

  updateUsername(newUsername: string, currentPassword: string) {
    return this.http.post<{ message: string; username: string }>(
      `${this.baseUrl}/update-username`,
      { newUsername, currentPassword }
    ).pipe(
      tap((res) => localStorage.setItem('username', res.username))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
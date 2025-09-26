import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { User } from '../../shared/models/user.model';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {

  username: string;
  email: string;
  password:string;
  firstName:string;
  lastName:string;
  role:string;
  createdAt: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}
  
  login(credentials: LoginCredentials): Observable<User> {
    return this.apiService.post<AuthResponse>('/auth/login', credentials).pipe(
      tap(response => this.setSession(response)),
     
      map(response => response.user),
      catchError(error => {
        return throwError(() => error?.error?.message || 'Invalid credentials');
      })
      
    );
  }
register(credentials: RegisterCredentials): Observable<any> {
    console.log("testcridintil", credentials);
    return this.apiService.post<AuthResponse>('/auth/register', credentials).pipe(
      map(response => {
        // Don't set session on registration, just return success response
        return { 
          status: 200, 
          message: 'Registration successful',
       
        };
      }),
      catchError(error => {
        return throwError(() => error?.error?.message || 'Registration failed');
      })
    );
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
  
  isLoggedIn(): boolean {
    const expiration = localStorage.getItem('expiration');
    if (!expiration) {
      return false;
    }
    
    const expiresAt = new Date(expiration);
    return new Date() < expiresAt;
  }
  
  getUser(): Observable<User | null> {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      return of(null);
    }
    
    try {
      const user = JSON.parse(userStr) as User;
      return of(user);
    } catch (e) {
      this.logout();
      return of(null);
    }
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  private setSession(authResult: AuthResponse): void {
    // Set expiration to 24 hours from now
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expiration', expiresAt.toISOString());
    localStorage.setItem('user', JSON.stringify(authResult.user));
  }
}
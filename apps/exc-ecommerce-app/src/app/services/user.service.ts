import { Observable, Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // user!: string;
  private userSubject = new Subject<string>();

  constructor() {}

  fetchUserFromLocalStorage() {
    return localStorage.getItem('user');
  }

  setUserToLocalStorage(user: string) {
    localStorage.setItem('user', user.toLowerCase());
  }

  removeUserFromLocalStorage() {
    localStorage.removeItem('user');
  }

  setUser(user: string): void {
    this.setUserToLocalStorage(user.toLowerCase());
    this.userSubject.next(user.toLowerCase());
  }

  fetchUser() {
    const user = this.fetchUserFromLocalStorage();
    user && this.userSubject.next(user.toLowerCase());
  }

  removeUser() {
    this.removeUserFromLocalStorage();
    this.userSubject.next('');
  }

  onSetUser(): Observable<string> {
    return this.userSubject.asObservable();
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public balance = 0;

  constructor() { 
  }


  getBalance() {
    return this.balance;
  }
 
  add(val) {
    this.balance = this.balance + val;
  }
  
  subtract(val) {
    this.balance = this.balance - val;
  }
}

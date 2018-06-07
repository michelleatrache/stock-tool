import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public balance = 0;

  constructor() {
    this.balance = parseInt(localStorage.getItem('balance'));
    if(isNaN(this.balance)){
      this.balance = 0;
    }
  }


  getBalance() {
    return this.balance;
  }

  saveBalance(){
    localStorage.setItem('balance', String(this.balance));
  }
 
  add(val) {
    this.balance = this.balance + val;
    this.saveBalance();
  }
  
  subtract(val) {
    this.balance = this.balance - val;
    this.saveBalance();
  }

  buyStocks(stock_id, stock_price, num_stocks){
    let cost = stock_price * num_stocks;
    if(cost > this.balance){
      alert("You do not have the funds to make this purchase.");
    }
    else{
      this.subtract(cost);
    }
  }
}

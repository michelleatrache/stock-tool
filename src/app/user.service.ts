import { Injectable } from '@angular/core';
import { Stock } from '../stock';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  balance = 0;
  ownedStocks:Array<Stock> = [];

  constructor() {
    this.balance = parseInt(localStorage.getItem('balance'));
    this.ownedStocks = JSON.parse(localStorage.getItem('ownedStocks') || '[]');
    if(this.ownedStocks == null){
      this.ownedStocks = [];
    }
    console.log(this.ownedStocks);
    if(isNaN(this.balance)){
      this.balance = 0;
    }
  }

  getOwnedStocks(){
    return this.ownedStocks;
  }

  getBalance() {
    return this.balance;
  }

  saveBalance(){
    localStorage.setItem('balance', String(this.balance));
  }

  saveOwnedStocks(){
    localStorage.setItem('ownedStocks', JSON.stringify(this.ownedStocks));
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
      let boughtStock = new Stock(stock_id, stock_price, num_stocks);
      console.log(boughtStock);
      this.ownedStocks.push(boughtStock);
      this.saveOwnedStocks();
    }
  }
}

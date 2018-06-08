import { Injectable } from '@angular/core';
import { Stock } from '../stock';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  balance = 0;
  ownedStocks: Array<Stock> = [];

  constructor() {
    this.balance = parseInt(localStorage.getItem('balance'));
    this.ownedStocks = JSON.parse(localStorage.getItem('ownedStocks') || '[]');
    if (this.ownedStocks == null) {
      this.ownedStocks = [];
    }
    console.log(this.ownedStocks);
    if (isNaN(this.balance)) {
      this.balance = 0;
    }
  }

  getOwnedStocks() {
    return this.ownedStocks;
  }

  getBalance() {
    return this.balance;
  }

  // Save user balance across browser sessions
  saveBalance() {
    localStorage.setItem('balance', String(this.balance));
  }

  // Save user's owned stocks across browser sessions
  saveOwnedStocks() {
    localStorage.setItem('ownedStocks', JSON.stringify(this.ownedStocks));
  }

  // Add val to the current user balance
  add(val) {
    this.balance = this.balance + val;
    this.saveBalance();
  }

  // Subtract val from the current user balance
  subtract(val) {
    this.balance = this.balance - val;
    this.saveBalance();
  }

  // Return the owned stock with stock_id
  getStock(stock_id) {
    for (let i = 0; i < this.ownedStocks.length; i++) {
      if (this.ownedStocks[i].id == stock_id) {
        return this.ownedStocks[i];
      }
    }
  }

  // Return the total net assets based on current stock prices
  getNetAssets(){
    let netAssets = 0;
    for (let i = 0; i < this.ownedStocks.length; i++) {
      let curStock = this.ownedStocks[i];
      netAssets += (parseInt(curStock.amountOwned) * parseInt(curStock.price));
    }
    return netAssets;
  }

  // Buy {num_stocks} of {stock_id} for ${stock_price} per share
  buyStocks(stock_id, stock_price, num_stocks) {
    let cost = stock_price * num_stocks;
    if (cost > this.balance) {
      alert("You do not have the funds to make this purchase.");
    }
    else {
      let found = false;
      // Check if user already owns stocks of stock_id
      for (let i = 0; i < this.ownedStocks.length; i++) {
        if (this.ownedStocks[i].id == stock_id) {
          // Then we own this already. So increment its number of shares
          this.ownedStocks[i].amountOwned += num_stocks;
          found = true;
        }
      }
      if (!found) {
        // user doesn't own this stock, so create it
        let boughtStock = new Stock(stock_id, stock_price, num_stocks);
        this.ownedStocks.push(boughtStock);
      }
      this.subtract(cost);
      this.saveOwnedStocks();
    }
  }

  // Sell {num_shares} shares of stock {stock_id}
  sellShares(stock_id, num_shares) {
    for (let i = 0; i < this.ownedStocks.length; i++) {
      let curStock = this.ownedStocks[i];
      if (curStock.id == stock_id) {
        // Determine how much money is gained
        let moneyGained = num_shares * parseInt(curStock.price);

        let newAmountOwned = parseInt(curStock.amountOwned) - num_shares;
        if (newAmountOwned < 0) {
          alert("You are trying to sell more shares than you own. Please try again.");
        }
        else if (newAmountOwned > 0) {
          // Decrement number of shares owned for this stock
          curStock.amountOwned = String(newAmountOwned);
          this.add(moneyGained);

        }
        else {
        // Then no shares remain. Let's delete this object from the array
        delete this.ownedStocks[i];
        this.add(moneyGained);
      }
    }
  }
    this.saveOwnedStocks();
  }
}

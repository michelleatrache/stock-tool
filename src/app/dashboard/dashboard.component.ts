import { Component, OnInit } from '@angular/core';
import { UserService }      from '../user.service';
import { Stock } from '../../stock';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  balance: number;
  updateAmount: number;
  ownedStocks:Array<Stock> = [];
  sellAmount: number = 0;
  netAssets: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.updateBalance();
    this.updateOwnedStocks();
    this.updateNetAssets();
  }

  // Update the values from the shared service so we can persist on refresh
  updateNetAssets(){
    this.netAssets = this.userService.getNetAssets();
  }

  updateBalance(){
    this.balance = this.userService.getBalance();
  }

  updateOwnedStocks(){
    this.ownedStocks = this.userService.getOwnedStocks();
  }

  // Increase user's balance by this.updateAmount
  addBalance(){
    if(this.updateAmount == null){
      alert("Please input a real number to increment your balance by.");
    }
    else{
      this.userService.add(this.updateAmount);
      this.updateBalance();
    }
  }

  // Decrease user's balance by this.updateAmount
  subtractBalance(){
    if(this.updateAmount == null){
      alert("Please input a real number to decrement your balance by.");
    }
    else{
      this.userService.subtract(this.updateAmount);
      this.updateBalance();
    }  
  }

  // Sell {this.sellAmount} shares of stock {stockId}
  sellShare(stockId){
    this.userService.sellShares(stockId, this.sellAmount);
    this.updateBalance();
  }
}

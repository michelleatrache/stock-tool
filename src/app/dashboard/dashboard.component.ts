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
  updateAmount: number = 0;
  ownedStocks:Array<Stock> = [];
  sellAmount: number = 0;

  constructor(private userService: UserService) { 
  }

  ngOnInit() {
    this.updateBalance();
    this.updateOwnedStocks();
  }

  updateBalance(){
    this.balance = this.userService.getBalance();
  }

  updateOwnedStocks(){
    this.ownedStocks = this.userService.getOwnedStocks();
  }

  addBalance(){
    this.userService.add(this.updateAmount);
    this.updateBalance();
  }

  subtractBalance(){
    this.userService.subtract(this.updateAmount);
    this.updateBalance();
  }

  sellShare(stockId){
    this.userService.sellShares(stockId, this.sellAmount);
    this.updateBalance();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService }      from '../user.service';
import { Router } from '@angular/router';
import { Stock } from '../../stock';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent {
  stockId: string;
  price: string;
  amountOwned: string;
  sellAmount; number;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    let currentUrl = this.router.url;
    // Examining the URL to grab the stock id we're viewing, which isn't the best way..
    this.stockId = currentUrl.slice(8);
    this.setStockData();
  }

  // Set all stock data on the detail page
  setStockData(){
    let curStock = this.userService.getStock(this.stockId);
    this.price = curStock.price;
    this.amountOwned = curStock.amountOwned;
  }

  // Refresh page on selling shares to see updated amount of stocks owned
  refresh(){
    window.location.reload();
  }

  // Sell {this.sellAmount} shares of stock {this.stockId}
  sellShares(){
    this.userService.sellShares(this.stockId, this.sellAmount);
    this.refresh();
    this.setStockData();
  }
}

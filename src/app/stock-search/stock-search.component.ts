import { Component, OnInit } from '@angular/core';
import { UserService }      from '../user.service';
import { StockService }      from '../stock.service';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.css']
})
export class StockSearchComponent {
  balance: number;
  x: string;
  stockPrice: string;
  stockName: string;
  buyAmount: number;

  constructor(private userService: UserService, private stockService: StockService) { }

  ngOnInit() {
    this.updateBalance();
    this.stockPrice = null;
    this.stockName = null;
  }

  // To persist previous balance on refresh
  updateBalance(){
    this.balance = this.userService.getBalance();
  }

  // Buy {this.buyAmount} shares of stock {this.stockName}
  buyStocks(){
    this.userService.buyStocks(this.stockName, this.stockPrice, this.buyAmount);
    this.updateBalance();
  }

  // Call API to search for stock_id JSON data.
  search(stock_id){
    this.stockName = stock_id;

    this.stockService.getStockPrice(stock_id).subscribe(
      data=>{
        this.x = JSON.stringify(data);

        let obj = JSON.parse(this.x);

        // This specific index of the returned JSON contains most recent stock price
        this.stockPrice = obj.dataset_data.data[0][1];
      }
    );
  }
  

}

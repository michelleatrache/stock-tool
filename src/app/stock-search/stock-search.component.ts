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
    // TODO: CHANGE BACK TO NULL
    this.stockPrice = null;
    this.stockName = null;
    console.log(this.stockPrice);
  }

  updateBalance(){
    this.balance = this.userService.getBalance();
  }

  buyStocks(){
    this.userService.buyStocks(this.stockName, this.stockPrice, this.buyAmount);
    this.updateBalance();
  }

  search(stock_id){
    this.stockName = stock_id;

  this.stockService.getStockPrice(stock_id).subscribe(
    data=>{
      this.x = JSON.stringify(data);
     // console.log(data);

      let obj = JSON.parse(this.x);

      this.stockPrice = obj.dataset_data.data[0][1];
      console.log(obj);
      console.log("stockPrice: " + this.stockPrice);

    }
  );


  }
  

}

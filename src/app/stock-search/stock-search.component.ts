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

  constructor(private userService: UserService, private stockService: StockService) { }

  ngOnInit() {
    this.updateBalance();
  }

  updateBalance(){
    this.balance = this.userService.getBalance();
  }

  search(stock_id){
    console.log(stock_id);
  //  this.stockService.getStockPrice(stock_id);

  this.stockService.getStockPrice(stock_id).subscribe(
    data=>{
      this.x = JSON.stringify(data);
     // console.log(data);

      let obj = JSON.parse(this.x);

      let stockPrice = obj.dataset_data.data[0][1];
      console.log(obj);
      console.log("stockPrice: " + stockPrice);

      
      // Call function on data to parse the JSON
    }
  );
  }
  

}

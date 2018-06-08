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
    this.stockId = currentUrl.slice(8);
    console.log(currentUrl);
    this.setStockData();
  }

  setStockData(){
    let curStock = this.userService.getStock(this.stockId);
    this.price = curStock.price;
    this.amountOwned = curStock.amountOwned;

    console.log(curStock);
  }

  refresh(){
    window.location.reload();
  }

  sellShares(){
    this.userService.sellShares(this.stockId, this.sellAmount);
    this.refresh();
    this.setStockData();
  }
}

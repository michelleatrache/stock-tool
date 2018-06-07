import { Component, OnInit } from '@angular/core';
import { UserService }      from '../user.service';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.css']
})
export class StockSearchComponent {
  balance: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.updateBalance();
  }

  updateBalance(){
    this.balance = this.userService.getBalance();
  }

}

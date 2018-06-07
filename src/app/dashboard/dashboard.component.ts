import { Component, OnInit } from '@angular/core';
import { UserService }      from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  balance: number;
  updateAmount: number = 0;

  constructor(private userService: UserService) { 
  }

  ngOnInit() {
    this.updateBalance();
  }

  updateBalance(){
    this.balance = this.userService.getBalance();
  }

  addBalance(){
    this.userService.add(this.updateAmount);
    this.updateBalance();
  }

  subtractBalance(){
    this.balance = this.balance - this.updateAmount;
    this.updateBalance();
  }
}

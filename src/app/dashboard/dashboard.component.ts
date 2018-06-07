import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  balance: number;
  updateAmount: number = 0;;

  constructor() { 
    this.balance = 0;
  }

  ngOnInit() {
  }

  addBalance(){
    this.balance = this.balance + this.updateAmount;
  }

  subtractBalance(){
    this.balance = this.balance - this.updateAmount;
  }
}

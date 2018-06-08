import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockSearchComponent }      from './stock-search/stock-search.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { StockDetailComponent }   from './stock-detail/stock-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stock-search', component: StockSearchComponent },
  { path: 'detail/:id', component: StockDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
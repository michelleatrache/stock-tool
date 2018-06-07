import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Http} from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Stock } from '../stock';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  // Quandl API key
  api_key = "CCE3RKDibsEi3Uix1-9R"

  constructor(private http: HttpClient) { }

    // To get most recent stock price
  //https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?column_index=4&rows=1&api_key=CCE3RKDibsEi3Uix1-9R

    /** GET stock from the server */
    getStockPrice (stockId): Observable<Stock[]> {
      console.log("getStockPrice() called");
           let URL = "https://www.quandl.com/api/v3/datasets/WIKI/" + stockId 
     + "/data.json?column_index=4&rows=1&api_key=" + this.api_key;
      return this.http.get<Stock[]>(URL)
        .pipe(
          tap(heroes => this.log(`fetched stock data`)),
          catchError(this.handleError('getStockPrice', []))
        );
    }

     /**
   * Handle failed HTTP operation
   * Let the app continue despite this
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error.status); // log to console

      // Send alert on known error messages
      if(error.status == "404"){
        alert("This search returned no results. Please double check your input.");
      }

      if(error.status == "429"){
        alert("ERROR 429: There are too many requests being sent to the server.");
      }

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

    private log(message: string) {
      console.log(message);
    }
  }

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

  api_key = "CCE3RKDibsEi3Uix1-9R"

  constructor(private http: HttpClient) { }

    // To get most recent stock price
  //https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?column_index=4&rows=1

    /** GET heroes from the server */
    getStockPrice (stockId): Observable<Stock[]> {
      console.log("getStockPrice() called");
           let URL = "https://www.quandl.com/api/v3/datasets/WIKI/" + stockId 
     + "/data.json?column_index=4&rows=1&" + this.api_key;
      return this.http.get<Stock[]>(URL)
        .pipe(
          tap(heroes => this.log(`fetched stock data`)),
          catchError(this.handleError('getStockPrice', []))
        );
    }

     /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      console.log(message);
    }
  }

  // getStockPrice(stockId) {
  //   let URL = "https://www.quandl.com/api/v3/datasets/WIKI/" + stockId 
  //   + "/data.json?column_index=4&rows=1&" + this.api_key;
  //   return this.http.get(URL.map(res => res.json()));
  //       }

  // getStockPrice(stockId) {
  //   let URL = "https://www.quandl.com/api/v3/datasets/WIKI/" + stockId 
  //   + "/data.json?column_index=4&rows=1&" + this.api_key;
  //   return new Promise((resolve, reject) => {
  //     this.http.get(URL)
  //         .pipe(map(res => res.json()))
  //         .subscribe(data => {
  //             // console.log(data)
  //            resolve(data);
  //          }, (error => {
  //             reject(error);
  //           }));
  //        });
  //       }
    }

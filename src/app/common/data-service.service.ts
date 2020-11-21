import { Injectable } from '@angular/core';
import {LoggerService} from './logger.service';
import {QuoteInterface} from '../interface/quote.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private logger: LoggerService) { }

  saveQuote(quote: QuoteInterface): void {
    let quotesArr = [];
    const localstorageItem = localStorage.getItem('localQuotes');
    if (localstorageItem !== null) {
      quotesArr = [quote, ...JSON.parse(localstorageItem)];
    } else {
      quotesArr.push(quote);
    }
    try{
      localStorage.setItem('localQuotes', JSON.stringify(quotesArr));
    } catch (e) {
      this.logger.warn(e);
    }
  }

  fetchQuotes(): QuoteInterface[] {
    const localstorageItem = localStorage.getItem('localQuotes');
    if (!localstorageItem) {
      return [];
    } else {
      return JSON.parse(localstorageItem);
    }
  }
}

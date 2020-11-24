import { Injectable } from '@angular/core';
import {LoggerService} from './logger.service';
import {QuoteInterface} from '../interface/quote.interface';
import {environment} from '../../environments/environment';
import {ApiService} from './api/api.service';
import {ApiRequest} from './api/api.type';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private logger: LoggerService, private api: ApiService) { }

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

  saveQuotes(quotes: QuoteInterface[]): void {
    try{
      localStorage.setItem('localQuotes', JSON.stringify(quotes));
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

  fetchQuotesSuggestions(): Promise<any> {
    const apiEndpoint = environment.apiSuggestionQuotesEndpoint;
    const request = new ApiRequest('get', apiEndpoint);
    return this.api.call(request).catch(error => {
      this.logger.warn(error);
      return [];
    });
  }
}

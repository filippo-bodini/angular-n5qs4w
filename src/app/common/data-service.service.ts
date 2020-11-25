import { Injectable } from '@angular/core';
import {LoggerService} from './logger.service';
import {QuoteInterface} from '../interface/quote.interface';
import {environment} from '../../environments/environment';
import {ApiService} from './api/api.service';
import {ApiRequest} from './api/api.type';
import {element} from "protractor";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private logger: LoggerService, private api: ApiService) { }

  saveQuote(quote: QuoteInterface): Promise<any> {
    const apiEndpoint = environment.apiPlatformEndpoint + '/api/quotes';
    const request = new ApiRequest('post', apiEndpoint, quote);
    return this.api.call(request);
  }

  async getQuotes(): Promise<any> {
    const apiEndpoint = environment.apiPlatformEndpoint + '/api/quotes';
    const request = new ApiRequest('get', apiEndpoint);
    return this.api.call(request).then(response => {
      const res = response['hydra:member'].map(element => {
        return {
          author: element.author,
          text: element.text,
          createdAt: element.createdAt,
        } as QuoteInterface;
      });
      return res as QuoteInterface[];
    }).catch(error => {
      this.logger.warn(error);
    });
  }

  // should call API instead localStorage
  saveQuotes(quotes: QuoteInterface[]): boolean {
    // localstorage method should be deleted
    switch (environment.method) {
      case 'localStorage':
        try{
          localStorage.setItem('localQuotes', JSON.stringify(quotes));
          return true;
        } catch (e) {
          this.logger.warn(e);
          return false;
        }
      case 'apiPlatform':
        debugger;
        // quotes[0] is the new quote because it's sorted by reducer that is already tested.
        this.saveQuote(quotes[0]).then(response => {
          return true;
        }).catch(error => {
          this.logger.warn(error);
          return false;
        });
    }
  }

  // should call API instead localStorage
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

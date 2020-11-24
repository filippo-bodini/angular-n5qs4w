import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectQuoteState} from '../store/selectors';
import {DatePipe} from '@angular/common';
import {QuoteState} from '../store/state';
import {fetchSuggestions, listAddResult, saveItems} from '../store/actions';
import {Observable} from 'rxjs';
import {QuoteInterface} from '../interface/quote.interface';

@Component({
  selector: 'app-quote-suggestions',
  templateUrl: './quote-suggestions.component.html',
  styleUrls: ['./quote-suggestions.component.css']
})
export class QuoteSuggestionsComponent implements OnInit {
  state$: Observable<QuoteState>;

  constructor(private datePipe: DatePipe, private readonly store: Store<QuoteState>) {
    this.state$ = this.store.pipe(
      select(selectQuoteState),
    );
  }

  ngOnInit(): void {
    this.store.dispatch(fetchSuggestions());
  }

  public addToMyQuotes(quote: QuoteInterface): void {
    const date = new Date();
    const newQuote = {
      text: quote.text,
      author: quote.author,
      createdAt: this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss')} as QuoteInterface;
    this.store.dispatch(listAddResult({newQuote}));
    this.store.dispatch(saveItems());
  }
}

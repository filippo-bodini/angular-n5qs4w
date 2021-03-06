import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from './common/logger.service';
import {DatePipe} from '@angular/common';
import {QuoteInterface} from './interface/quote.interface';
import {QuoteState} from './store/state';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {selectQuoteState} from './store/selectors';
import {fetchItems, filterKeywords, listAddResult, saveItems} from './store/actions';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  inputQuotes: FormGroup;
  title = 'my-app';
  errorMessage: string;
  state$: Observable<QuoteState>;
  displayQuotes: QuoteInterface[] = [];
  mobileMenuOpened: boolean;
  private keywordsFilter$ = new Subject<string[]>();

  constructor(private fb: FormBuilder, private logger: LoggerService,
              private datePipe: DatePipe, private readonly store: Store<QuoteState>) {
    this.state$ = this.store.pipe(
      select(selectQuoteState),
    );
  }

  ngOnInit(): void {
    this.fetchQuotes();
    this.mobileMenuOpened = false;
    this.errorMessage = '';
    this.inputQuotes = this.fb.group({
      newQuote: ['', Validators.required],
      author: ['']
    });
    this.keywordsFilter$.pipe(
      debounceTime(500),
    ).subscribe(V => {
      this.store.dispatch(filterKeywords({keywords: V}));
    });
  }

  ngOnDestroy(): void {
    this.keywordsFilter$.unsubscribe();
  }

  public insertNewQuote(): void {
    const values = this.inputQuotes.getRawValue();
    const date = new Date();
    const newQuote = {text: values.newQuote, author: values.author, createdAt: this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss')} as QuoteInterface;
    this.store.dispatch(listAddResult({newQuote}));
    this.store.dispatch(saveItems());
  }

  public fetchQuotes(): void {
    this.store.dispatch(fetchItems());
  }

  public filterKeyword(value): void {
    const valueArr = value.split(' ').filter(val => val !== '');
    this.keywordsFilter$.next(valueArr as string[]);
  }

  public copyToClipboard(quote): void {
    // a safe procedure to copy elements @todo how to test?
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = quote.author && quote.author !== '' ? quote.text + ' (' + quote.author + ')' : quote.text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}

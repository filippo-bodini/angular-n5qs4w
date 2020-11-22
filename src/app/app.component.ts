import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from './common/data-service.service';
import {LoggerService} from './common/logger.service';
import {DatePipe} from '@angular/common';
import {QuoteInterface} from './interface/quote.interface';
import {QuoteState} from './Store/state';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectQuoteState} from './Store/selectors';
import {listAddResult, saveItems} from './Store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputQuotes: FormGroup;
  title = 'my-app';
  errorMessage: string;
  state$: Observable<QuoteState>;
  displayQuotes: QuoteInterface[] = [];
  constructor(private fb: FormBuilder, private dataService: DataService, private logger: LoggerService,
              private datePipe: DatePipe, private readonly store: Store<QuoteState>) {
    this.state$ = this.store.pipe(
      select(selectQuoteState),
    );
  }

  ngOnInit(): void {
    this.errorMessage = '';
    this.inputQuotes = this.fb.group({
      newQuote: ['', Validators.required],
      author: ['']
    });
  }

  insertNewQuote(): void {
    const values = this.inputQuotes.getRawValue();
    const date = new Date();
    const newQuote = {text: values.newQuote, author: values.author, createdAt: this.datePipe.transform(date, 'yyyy-MM-dd')} as QuoteInterface;
    this.store.dispatch(listAddResult({newQuote}));
    this.store.dispatch(saveItems());

    // old method
    // try {
    //   this.dataService.saveQuote(newQuote);
    //   this.displayQuotes = [newQuote, ...this.displayQuotes];
    // } catch (e) {
    //   this.logger.warn(e);
    // }
  }

  fetchQuotes(): void {
    this.displayQuotes = this.dataService.fetchQuotes();
  }
}

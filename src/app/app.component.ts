import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from './common/data-service.service';
import {LoggerService} from './common/logger.service';
import {DatePipe} from "@angular/common";
import {QuoteInterface} from "./interface/quote.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputQuotes: FormGroup;
  title = 'my-app';
  errorMessage: string;
  displayQuotes: QuoteInterface[] = [];
  constructor(private fb: FormBuilder, private dataService: DataService, private logger: LoggerService, private datePipe: DatePipe) {

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
    try {
      this.dataService.saveQuote(newQuote);
      this.displayQuotes.push(newQuote);
    } catch (e) {
      this.logger.warn(e);
    }
  }

  fetchQuotes(): void {
    this.displayQuotes = this.dataService.fetchQuotes();
  }
}

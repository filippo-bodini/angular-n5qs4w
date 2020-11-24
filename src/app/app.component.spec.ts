import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {FormBuilder} from '@angular/forms';
import {DataService} from './common/data-service.service';
import {LoggerService} from './common/logger.service';
import {DatePipe} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as QuoteReducer from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {QuoteEffects} from './store/effects';
import {ApiService} from './common/api/api.service';
import {HttpClientModule} from '@angular/common/http';
import {QuoteSuggestionsComponent} from './quote-suggestions/quote-suggestions.component';

describe('AppComponent', () => {
  const newQuotes = [
    {
      author: 'Robert C. Martin',
      text: 'The only way to go fast, is to go well.',
      createdAt: '2020-21-11'
    },
    {
      author: 'John Maynard Keynes',
      text: 'When the facts change, I change my mind.',
      createdAt: '2020-20-11'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('quote', QuoteReducer.reducer),
        EffectsModule.forRoot(),
        EffectsModule.forFeature([QuoteEffects])
      ],
      declarations: [
        AppComponent, QuoteSuggestionsComponent
      ],
      providers: [ FormBuilder, DataService, LoggerService, DatePipe, ApiService ]
    }).compileComponents();
    localStorage.setItem('localQuotes', JSON.stringify([]));
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('my-app');
  });

  it(`should have a text area where you can write or paste a quote`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#new-quote')).toBeTruthy();
  });

  it(`should have a text area where you can write or paste the quote's author`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('#quote-author')).toBeTruthy();
  });

  it(`should have a an area where you can read quotes if inserted`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    component.inputQuotes.controls.author.setValue(newQuotes[0].author);
    component.inputQuotes.controls.newQuote.setValue(newQuotes[0].text);
    component.insertNewQuote();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.quote-container')).toBeTruthy();
  });

  it(`should insert quotes`, () => {
    localStorage.setItem('localQuotes', JSON.stringify([]));
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    component.inputQuotes.controls.author.setValue(newQuotes[0].author);
    component.inputQuotes.controls.newQuote.setValue(newQuotes[0].text);
    component.insertNewQuote();
    component.fetchQuotes();
    fixture.detectChanges();
    let compiled = fixture.nativeElement;
    console.log(compiled.querySelectorAll('#quote-list > .list-group > .list-group-item').length);
    expect(compiled.querySelectorAll('#quote-list > .list-group > .list-group-item').length).toEqual(1);
    component.inputQuotes.controls.author.setValue(newQuotes[1].author);
    component.inputQuotes.controls.newQuote.setValue(newQuotes[1].text);
    component.insertNewQuote();
    component.fetchQuotes();
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    console.log(compiled.querySelectorAll('#quote-list > .list-group > .list-group-item').length);
    expect(compiled.querySelectorAll('#quote-list > .list-group > .list-group-item').length).toEqual(2);
    component.displayQuotes = [];
  });

  it(`should list quotes after inserting`, () => {
    // In this unit testing we don't simulate form compilation, we test the logic behind
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.displayQuotes = [];
    component.ngOnInit();
    component.inputQuotes.controls.author.setValue(newQuotes[0].author);
    component.inputQuotes.controls.newQuote.setValue(newQuotes[0].text);
    component.insertNewQuote();
    component.fetchQuotes();
    component.inputQuotes.controls.author.setValue(newQuotes[1].author);
    component.inputQuotes.controls.newQuote.setValue(newQuotes[1].text);
    component.insertNewQuote();
    component.fetchQuotes();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#quote-list')).toBeTruthy();
  });

  it(`should have a button to copy to clipboard`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    component.inputQuotes.controls.author.setValue(newQuotes[0].author);
    component.inputQuotes.controls.newQuote.setValue(newQuotes[0].text);
    component.insertNewQuote();
    component.fetchQuotes();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.right-btn')).toBeTruthy();
  });
});

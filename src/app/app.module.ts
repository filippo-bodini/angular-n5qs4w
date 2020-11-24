import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {environment} from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoggerService} from './common/logger.service';
import {DataService} from './common/data-service.service';
import {DatePipe} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as QuoteReducer from './store/reducers';
import {QuoteEffects} from './store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { QuoteSuggestionsComponent } from './quote-suggestions/quote-suggestions.component';

@NgModule({
  declarations: [
    AppComponent,
    QuoteSuggestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forRoot(),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    StoreModule.forFeature('quote', QuoteReducer.reducer),
    EffectsModule.forFeature([QuoteEffects]),
  ],
  providers: [DataService, LoggerService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {QuoteState} from './state';
import {select, Store} from '@ngrx/store';
import { listComplete, QuoteListActionTypes, QuoteListActionUnion, storeSuggestions} from './actions';
import {concatMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {selectQuoteState} from './selectors';
import {DataService} from '../common/data-service.service';
import {QuoteInterface} from '../interface/quote.interface';
import {environment} from '../../environments/environment';


@Injectable()
export class QuoteEffects {

  saveItems$ = createEffect(() => this.actions$.pipe(
    ofType(QuoteListActionTypes.QUOTE_LIST_SAVE_ITEMS),
    // Import latest state
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectQuoteState)))
    )),
    tap(([action, state]) => {
      this.dataService.saveQuotes(state.results);
    }),
    ),
    { dispatch: false });

  fetchItems$ = createEffect(() => this.actions$.pipe(
    ofType(QuoteListActionTypes.QUOTE_LIST_FETCH_ITEMS),
    // Import latest state
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectQuoteState)))
    )),
    tap(async () => {
      const quotes = environment.method === 'localStorage' ? this.dataService.fetchQuotes() as QuoteInterface[] :
        await this.dataService.getQuotes();
      console.log(quotes);
      this.store$.dispatch(listComplete({quotes}));
    }),
    ),
    { dispatch: false });


  fetchExternalItems$ = createEffect(() => this.actions$.pipe(
    ofType(QuoteListActionTypes.QUOTE_LIST_FETCH_SUGGESTION),
    // Import latest state
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectQuoteState)))
    )),
    tap(async () => {
      const quotes = await this.dataService.fetchQuotesSuggestions() as QuoteInterface[];
      this.store$.dispatch(storeSuggestions({quotes}));
    }),
    ),
    { dispatch: false });

  constructor(
    private readonly store$: Store<QuoteState>,
    private readonly actions$: Actions<QuoteListActionUnion>,
    private readonly dataService: DataService,
  ) {}
}

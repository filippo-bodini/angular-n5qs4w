import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {QuoteState} from './state';
import {select, Store} from '@ngrx/store';
import {QuoteListActionTypes, QuoteListActionUnion} from './actions';
import {concatMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {selectQuoteState} from './selectors';
import {DataService} from '../common/data-service.service';


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
  constructor(
    private readonly store$: Store<QuoteState>,
    private readonly actions$: Actions<QuoteListActionUnion>,
    private readonly dataService: DataService,
  ) {}
}

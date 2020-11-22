import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {QuoteState} from "./state";
import {Store} from '@ngrx/store';
import {QuoteListActionTypes, QuoteListActionUnion} from './actions';


@Injectable()
export class QuoteEffects {

  saveItem$ = createEffect(() => this.actions$.pipe(
    ofType(QuoteListActionTypes.QUOTE_LIST_SAVE_ITEM),
  ))

  constructor(
    private readonly store$: Store<QuoteState>,
    private readonly actions$: Actions<QuoteListActionUnion>,
  ) {}
}

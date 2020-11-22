import {createAction, props, union} from '@ngrx/store';
import {SortDirection} from './state';
import {QuoteInterface} from '../interface/quote.interface';

export enum QuoteListActionTypes {
  QUOTE_LIST_ORDER_CREATION = '[QUOTE-LIST] Order by creation',
  QUOTE_LIST_FILTER_KEYWORDS = '[QUOTE-LIST] Filter by keywords',
  QUOTE_LIST_SAVE_ITEMS = '[QUOTE-LIST] Save items',
  QUOTE_LIST_RESET = '[QUOTE-LIST] Reset',
  QUOTE_LIST_ADD_RESULT = '[QUOTE-LIST] Add result',
  QUOTE_LIST_COMPLETE = '[QUOTE-LIST] Complryr',
}
export const listReset = createAction(QuoteListActionTypes.QUOTE_LIST_RESET);
export const listAddResult = createAction(QuoteListActionTypes.QUOTE_LIST_ADD_RESULT, props<{ newQuote: QuoteInterface }>());
export const listComplete = createAction(QuoteListActionTypes.QUOTE_LIST_COMPLETE);
export const orderCreatedAt  = createAction(QuoteListActionTypes.QUOTE_LIST_ORDER_CREATION, props<{ direction: SortDirection }>());
export const filterKeywords = createAction(QuoteListActionTypes.QUOTE_LIST_FILTER_KEYWORDS, props<{ keywords: string[] }>());
export const saveItems = createAction(QuoteListActionTypes.QUOTE_LIST_SAVE_ITEMS);

const all = union({
  listReset,
  listAddResult,
  listComplete,
  orderCreatedAt,
  filterKeywords,
  saveItems
});

export type QuoteListActionUnion = typeof all;

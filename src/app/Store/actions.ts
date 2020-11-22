import {createAction, props, union} from '@ngrx/store';
import {SortDirection} from './state';
import {QuoteInterface} from '../interface/quote.interface';

export enum QuoteListActionTypes {
  QUOTE_LIST_ORDER_CREATION = '[QUOTE-LIST] Order by creation',
  QUOTE_LIST_FILTER_KEYWORDS = '[QUOTE-LIST] Filter by keywords',
  QUOTE_LIST_SAVE_ITEM = '[QUOTE-LIST] Save item',
  QUOTE_LIST_RESET = '[QUOTE-LIST] Reset',
  QUOTE_LIST_ADD_RESULT = '[QUOTE-LIST] Add result',
  QUOTE_LIST_COMPLETE = '[QUOTE-LIST] Complryr',
}
export const listReset = createAction(QuoteListActionTypes.QUOTE_LIST_RESET);
export const listAddResult = createAction(QuoteListActionTypes.QUOTE_LIST_ADD_RESULT, props<{ result: QuoteInterface }>());
export const listComplete = createAction(QuoteListActionTypes.QUOTE_LIST_COMPLETE);
export const orderCreatedAt  = createAction(QuoteListActionTypes.QUOTE_LIST_ORDER_CREATION, props<{ direction: SortDirection }>());
export const filterKeyword = createAction(QuoteListActionTypes.QUOTE_LIST_FILTER_KEYWORDS, props<{ keyword: string }>());
export const saveItem = createAction(QuoteListActionTypes.QUOTE_LIST_SAVE_ITEM);

const all = union({
  listReset,
  listAddResult,
  listComplete,
  orderCreatedAt,
  filterKeyword,
  saveItem
});

export type QuoteListActionUnion = typeof all;

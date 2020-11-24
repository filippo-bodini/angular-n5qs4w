import {createAction, props, union} from '@ngrx/store';
import {SortDirection} from './state';
import {QuoteInterface} from '../interface/quote.interface';

export enum QuoteListActionTypes {
  QUOTE_LIST_ORDER_CREATION = '[QUOTE-LIST] Order by creation',
  QUOTE_LIST_FILTER_KEYWORDS = '[QUOTE-LIST] Filter by keywords',
  QUOTE_LIST_SAVE_ITEMS = '[QUOTE-LIST] Save items',
  QUOTE_LIST_FETCH_ITEMS = '[QUOTE-LIST] Fetch items from local storage',
  QUOTE_LIST_FETCH_SUGGESTION = '[QUOTE-LIST] Fetch items from external API',
  QUOTE_LIST_STORE_SUGGESTION = '[QUOTE-LIST] Store items retrieved from fetchSuggestions',
  QUOTE_LIST_RESET = '[QUOTE-LIST] Reset',
  QUOTE_LIST_ADD_RESULT = '[QUOTE-LIST] Add result',
  QUOTE_LIST_COMPLETE = '[QUOTE-LIST] Complryr',
}
export const listReset = createAction(QuoteListActionTypes.QUOTE_LIST_RESET);
export const listAddResult = createAction(QuoteListActionTypes.QUOTE_LIST_ADD_RESULT, props<{ newQuote: QuoteInterface }>());
export const listComplete = createAction(QuoteListActionTypes.QUOTE_LIST_COMPLETE, props<{ quotes: QuoteInterface[] }>());
export const orderCreatedAt  = createAction(QuoteListActionTypes.QUOTE_LIST_ORDER_CREATION, props<{ direction: SortDirection }>());
export const filterKeywords = createAction(QuoteListActionTypes.QUOTE_LIST_FILTER_KEYWORDS, props<{ keywords: string[] }>());
export const saveItems = createAction(QuoteListActionTypes.QUOTE_LIST_SAVE_ITEMS);
export const fetchItems = createAction(QuoteListActionTypes.QUOTE_LIST_FETCH_ITEMS);
export const fetchSuggestions = createAction(QuoteListActionTypes.QUOTE_LIST_FETCH_SUGGESTION);
export const storeSuggestions = createAction(QuoteListActionTypes.QUOTE_LIST_STORE_SUGGESTION, props<{ quotes: QuoteInterface[] }>());

const all = union({
  listReset,
  listAddResult,
  listComplete,
  orderCreatedAt,
  filterKeywords,
  saveItems,
  fetchItems,
  fetchSuggestions,
  storeSuggestions,
});

export type QuoteListActionUnion = typeof all;

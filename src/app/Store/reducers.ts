import {QuoteInterface} from '../interface/quote.interface';
import {KeywordsFilterInterface, QuoteState, SortDirection, SortType} from './state';
import {Action, createReducer, on} from '@ngrx/store';
import {listAddResult, listComplete, listReset} from './actions';

const initialState: QuoteState = {
  ready: false,
  results: [],
  availableResults: [],
  numResults: 0,
  numAvailableResults: 0,
  hasFilters: false,
  filters: {},
  order: {
    type: SortType.CREATED_AT,
    direction: SortDirection.DESC,
  }
};

export const QuoteReducer = createReducer(
  initialState,
  on(listReset, (state) => initialState),
  on(listAddResult, (state, {result}) => listAddResultState(state, result)),
  on(listComplete, (state) => listCompleteState(state)),
);

export function reducer(state, action: Action): QuoteState {
  return QuoteReducer(state, action);
}

/**
 * State reducers
 */

export function listAddResultState(state: QuoteState, result: QuoteInterface): QuoteState {

  let newState = {
    ...state,
    results: [...state.results, result],
    numResults: state.numResults + 1,
  } as QuoteState;

  newState = updateStateAvailableResults(newState);
  return newState;
}

export function listCompleteState(state: QuoteState): QuoteState {
  const keywordFilter = initKeywordFilter();
  // Return the new state
  let newState = {
    ...state,
    ready: true,
    filters: {
      keywords: keywordFilter
    }
  } as QuoteState;

  newState = updateStateAvailableResults(newState);
  return newState;
}

/**
 * Utilities
 */

function updateStateAvailableResults(state: QuoteState): QuoteState {
  const availableResults = applyStateSorters(state, applyStateFilters(state, state.results));

  return {
    ...state,
    availableResults: [...availableResults],
    numAvailableResults: availableResults.length,
  } as QuoteState;
}

function applyStateFilters(state: QuoteState, results: QuoteInterface[]): QuoteInterface[] {
  let dataset = [...results];

  if (state.filters.keywords) {
    dataset = applyKeywordFilter(dataset, state.filters.keywords);
  }

  return dataset;
}

function applyStateSorters(state: QuoteState, results: QuoteInterface[]): QuoteInterface[] {
  let dataset = [...results];

  switch (state.order.type) {
    case SortType.CREATED_AT:
      dataset = sortResultsByCreatedAt(dataset, state.order.direction);
      break;
  }

  return dataset;
}
/**
 * Filter initialization
 */

export function initKeywordFilter(): KeywordsFilterInterface {
  return {
    activeValues: [],
  } as KeywordsFilterInterface;
}

/**
 * Filtering functions
 */

function applyKeywordFilter(dataset: QuoteInterface[], keywords: KeywordsFilterInterface): QuoteInterface[] {
  if (!keywords.activeValues.length) {
    return dataset;
  }
  return [...dataset].filter(element => keywords.activeValues.includes(element.author));
}

/**
 * Sorting functions
 */
function sortResultsByCreatedAt(results: QuoteInterface[], direction: SortDirection): QuoteInterface[] {
  return results.sort((item, next) => {
    const itemDate = new Date(item.createdAt).getTime();
    const nextDate = new Date(next.createdAt).getTime();
    if (direction === SortDirection.ASC) {
      return itemDate - nextDate;
    } else {
      return nextDate - itemDate;
    }
  });
}

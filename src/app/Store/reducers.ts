import {QuoteInterface} from '../interface/quote.interface';
import {KeywordsFilterInterface, QuoteState, SortDirection, SortType} from './state';
import {Action, createReducer, on} from '@ngrx/store';
import {filterKeywords, listAddResult, listComplete, listReset} from './actions';

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
  on(listAddResult, (state, {newQuote}) => listAddResultState(state, newQuote)),
  on(listComplete, (state) => listCompleteState(state)),
  on(filterKeywords, (state, {keywords}) => toggleKeywordFilterState(state, keywords)),
);

export function reducer(state, action: Action): QuoteState {
  return QuoteReducer(state, action);
}

/**
 * State reducers
 */

export function listAddResultState(state: QuoteState, newQuote: QuoteInterface): QuoteState {

  let newState = {
    ...state,
    ready: true,
    results: [...state.results, newQuote],
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

function toggleKeywordFilterState(state: QuoteState, keywords: string[]): QuoteState {
  // Prepare and return the new SearchListState
  let newState = {
    ...state,
    filters: {
      ...state.filters,
      keywords: {
        activeValues: keywords
      }
    }
  } as QuoteState;

  newState = updateStateAvailableResults(newState);

  return newState;
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

export function applyKeywordFilter(dataset: QuoteInterface[], keywords: KeywordsFilterInterface): QuoteInterface[] {
  // convert to lowercase
  const lowerKeywords = { activeValues : keywords.activeValues.map(value => value.toLowerCase()) } as KeywordsFilterInterface;
  if (!lowerKeywords.activeValues.length) {
    return dataset;
  }
  return [...dataset].filter(element => {
    for (const keyword of lowerKeywords.activeValues) {
      if (element.author.toLowerCase().includes(keyword.toLowerCase())) {
        return true;
      }
    }
    for (const keyword of lowerKeywords.activeValues) {
      if (element.text.toLowerCase().includes(keyword.toLowerCase())) {
        return true;
      }
    }
    return false;
  });
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

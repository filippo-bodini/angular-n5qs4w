import {QuoteState, SortDirection, SortType } from './state';

import {
  listAddResultState,
  applyKeywordFilter, addListSuggestionState
} from './reducers';
import {QuoteInterface} from '../interface/quote.interface';

const initialState: QuoteState = {
  ready: false,
  results: [],
  availableResults: [],
  suggestionQuotes: [],
  numResults: 0,
  numAvailableResults: 0,
  hasFilters: false,
  filters: {},
  order: {
    type: SortType.CREATED_AT,
    direction: SortDirection.DESC,
  }
};

const results = [
  {
    author: 'Albert Einstein',
    text: 'Try not to become a man of success. Rather become a man of value.',
    createdAt: '2020-11-10'
  },
  {
    author: 'Robert C. Martin',
    text: 'The only way to go fast, is to go well.',
    createdAt: '2020-11-11'
  },
  {
    author: 'John Maynard Keynes',
    text: 'When the facts change, I change my mind.',
    createdAt: '2020-11-12'
  }
] as QuoteInterface[];

//// begin test

describe('Search reducer features tests', () => {
  describe('default', () => {
    it('should add data to init state', () => {
      const newState = initialState;
      const modifiedState = listAddResultState(newState, results[0]);
      expect(newState.results.length).toBeLessThan(modifiedState.results.length);
    });
  });

  describe('default', () => {
    it('should add suggested quotes to init state', () => {
      const newState = initialState;
      const modifiedState = addListSuggestionState(newState, results);
      expect(modifiedState.suggestionQuotes.length).toEqual(results.length);
    });
  });

  describe('filter tests', () => {
    it('should apply keywords filter for author', () => {
      const newState = initialState;
      let fetchedState = listAddResultState(newState, results[0]);
      fetchedState = listAddResultState(fetchedState, results[1]);
      fetchedState = listAddResultState(fetchedState, results[2]);
      const filterByKeywordState = applyKeywordFilter(fetchedState.results, {activeValues: ['Albert Einstein']});
      expect(filterByKeywordState.length).toEqual(1);
      });

    it('should apply keywords filter for keyword inside text', () => {
      const newState = initialState;
      let fetchedState = listAddResultState(newState, results[0]);
      fetchedState = listAddResultState(fetchedState, results[1]);
      fetchedState = listAddResultState(fetchedState, results[2]);
      let filterByKeywordState = applyKeywordFilter(fetchedState.results, {activeValues: ['way']});
      expect(filterByKeywordState.length).toEqual(1);
      filterByKeywordState = applyKeywordFilter(fetchedState.results, {activeValues: ['fast']});
      expect(filterByKeywordState.length).toEqual(1);
      filterByKeywordState = applyKeywordFilter(fetchedState.results, {activeValues: ['the']});
      expect(filterByKeywordState.length).toEqual(3);
    });
    });

  describe('order tests', () => {
    it('should be automatically ordered by last inserted quote', () => {
      const newState = initialState;
      let fetchedState = listAddResultState(newState, results[0]);
      fetchedState = listAddResultState(fetchedState, results[1]);
      fetchedState = listAddResultState(fetchedState, results[2]);
      const firstCreatedAt = new Date(fetchedState.results[0].createdAt);
      const lastCreatedAt = new Date(fetchedState.results[1].createdAt);
      expect(firstCreatedAt.getTime()).toBeLessThanOrEqual(lastCreatedAt.getTime());
    });
  });
});

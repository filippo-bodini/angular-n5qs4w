import {QuoteInterface} from '../interface/quote.interface';

export enum SortType {
  CREATED_AT = 'CREATED_AT',
}
export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface QuoteState {
  ready: boolean;                         // List is ready to be seen
  results: QuoteInterface[];              // Bookable results
  availableResults: QuoteInterface[];     // Complete array of results filtered and sorted (but not sliced into pages)
  numResults: number;                     // Total number of found results
  numAvailableResults: number;            // Total number of filtered results
  hasFilters: boolean;                    // true if the search can be filtered
  filters: {
    keywords?: KeywordsFilterInterface;   // Price filter configuration
  };
  order: {
    type?: SortType,                      // Current order type
    direction?: SortDirection,            // Current order direction
  };
}

export interface KeywordsFilterInterface {
  activeValues: string[];
}

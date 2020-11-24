import {createFeatureSelector} from '@ngrx/store';
import {QuoteState} from './state';

export const selectQuoteState = createFeatureSelector<any, QuoteState>('quote');

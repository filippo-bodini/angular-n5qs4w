import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteSuggestionsComponent } from './quote-suggestions.component';
import {DataService} from '../common/data-service.service';
import {LoggerService} from '../common/logger.service';
import {DatePipe} from '@angular/common';
import {ApiService} from '../common/api/api.service';

describe('QuoteSuggestionsComponent', () => {
  let component: QuoteSuggestionsComponent;
  let fixture: ComponentFixture<QuoteSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteSuggestionsComponent ],
      providers: [DataService, LoggerService, DatePipe, ApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a list of different messages', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const listContainer = compiled.querySelector('.list-group');
    expect(listContainer).toBeTruthy();
    expect(2).toBeLessThanOrEqual(listContainer.children.length);
    expect(listContainer.children[0].innerHTML).toBeTruthy();
    expect(listContainer.children[0].innerHTML).not.toEqual(listContainer.children[1].innerHTML);
  });
});

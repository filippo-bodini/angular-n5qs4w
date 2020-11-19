import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputQuotes: FormGroup;
  title = 'my-app';
  errorMessage: string;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.errorMessage = '';
    this.inputQuotes = this.fb.group({
      newQuote: ['', Validators.required],
      author: ['']
    });
  }

  insertNewQuote(): void {

  }
}

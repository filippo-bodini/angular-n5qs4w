import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

@NgModule({
  declarations: [ AppComponent, HelloComponent ],
  imports:      [ BrowserModule, FormsModule ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';

import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

import { CustomRichtexteditorComponent } from './components/custom-richtexteditor/custom-richtexteditor.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomRichtexteditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RichTextEditorAllModule,
    RouterOutlet
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatIconModule } from "@angular/material";

import { AppComponent } from './app.component';
import { routes } from "./app.routes";

import { BrowserGlobalsModule } from "./modules/shared/browser-globals";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        BrowserGlobalsModule,

        routes
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

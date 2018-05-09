import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatIconModule } from "@angular/material";
import { OverlayModule } from '@angular/cdk/overlay';

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

        // Angular 6 has a bug. Without OverlayModule MatAutocomplete fail with missing dependency error.
        // https://github.com/angular/material2/issues/10820
        OverlayModule,

        BrowserGlobalsModule,

        routes
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

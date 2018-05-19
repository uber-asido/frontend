import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatIconModule } from "@angular/material";
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { routes } from "./app.routes";

import { AppInsightsModule } from "./modules/shared/app-insights";
import { BrowserGlobalsModule } from "./modules/shared/browser-globals";
import { NavigationModule } from "./modules/shared/navigation";

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

        AppInsightsModule,
        BrowserGlobalsModule,
        NavigationModule,

        routes
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

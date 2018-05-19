import { Component } from '@angular/core';

import { AppInsightsService } from "./modules/shared/app-insights";

@Component({
    selector: 'ub-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ub';

    constructor(private readonly appInsights: AppInsightsService) {
        this.appInsights.init();
    }
}

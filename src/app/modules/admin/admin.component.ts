import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSort, MatTableDataSource, PageEvent } from "@angular/material";

import { FileApi } from "../shared/api-file";
import { AppInsightsService } from "../shared/app-insights";

@Component({
    selector: 'ub-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
    constructor(appInsights: AppInsightsService) {
        appInsights.logPageView("admin");
    }
}

import { NgModule } from "@angular/core";

import { AppInsightsService } from "./app-insights.service";

@NgModule({
    providers: [AppInsightsService]
})
export class AppInsightsModule { }

export { AppInsightsService };

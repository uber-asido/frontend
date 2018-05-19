import { Injectable } from "@angular/core";
import { AppInsights } from "applicationinsights-js";

import { environment } from "environments/environment";

@Injectable()
export class AppInsightsService {
    private static readonly config: Microsoft.ApplicationInsights.IConfig = {
        instrumentationKey: environment.appInsightsKey
    }

    public init(): void {
        if (AppInsightsService.config.instrumentationKey) {
            AppInsights.downloadAndSetup(AppInsightsService.config);
        }
    }

    public logPageView(name?: string, url?: string, properties?: any, measurements?: any, duration?: number): void {
        AppInsights.trackPageView(name, url, properties, measurements, duration);
    }

    public logEvent(name: string, properties?: any, measurements?: any): void {
        AppInsights.trackEvent(name, properties, measurements);
    }
}

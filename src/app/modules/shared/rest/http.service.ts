import { Injectable } from "@angular/core";

import { xhr } from "./xhr";

@Injectable()
export class HttpService {
    public get<TResponse>(url: string): Promise<TResponse> {
        return xhr<TResponse>(url, "GET", null, null);
    }

    public post<TResponse>(url: string, body?: any, progressCallback: (percent: number) => void = null): Promise<TResponse> {
        return xhr<TResponse>(url, "POST", body, progressCallback);
    }

    public put<TResponse>(url: string, body?: any, progressCallback: (percent: number) => void = null): Promise<TResponse> {
        return xhr<TResponse>(url, "PUT", body, progressCallback);
    }

    public patch<TResponse>(url: string, body?: any, progressCallback: (percent: number) => void = null): Promise<TResponse> {
        return xhr<TResponse>(url, "PATCH", body, progressCallback);
    }

    public delete<TResponse>(url: string): Promise<TResponse> {
        return xhr<TResponse>(url, "DELETE", null, null);
    }
}

import { Injectable } from "@angular/core";

import { xhr } from "./xhr";

interface ODataResponseMulti<TEntity> {
    value: TEntity[];
}

@Injectable()
export class ODataService {
    public get<TEntity>(url: string): Promise<TEntity> {
        return xhr<TEntity>(url, "GET", null, null);
    }

    public async getMulti<TEntity>(url: string): Promise<TEntity[]> {
        const response = await xhr<ODataResponseMulti<TEntity>>(url, "GET", null, null);
        return response.value;
    }

    public post<TEntity>(url: string, body?: any, progressCallback: (percent: number) => void = null): Promise<TEntity> {
        return xhr<TEntity>(url, "POST", body, progressCallback);
    }

    public async postMulti<TEntity>(url: string, body?: any, progressCallback: (percent: number) => void = null): Promise<TEntity[]> {
        const response = await xhr<ODataResponseMulti<TEntity>>(url, "POST", body, progressCallback);
        return response.value;
    }

    public put<TEntity>(url: string, body?: any, progressCallback: (percent: number) => void = null): Promise<TEntity> {
        return xhr<TEntity>(url, "PUT", body, progressCallback);
    }

    public async putMulti<TEntity>(url: string, body?: any, progressCallback: (percent: number) => void = null): Promise<TEntity[]> {
        const response = await xhr<ODataResponseMulti<TEntity>>(url, "PUT", body, progressCallback);
        return response.value;
    }

    public patch<TEntity>(url: string, body?: any, progressCallback: (percent: number) => void = null): Promise<TEntity> {
        return xhr<TEntity>(url, "PATCH", body, progressCallback);
    }

    public async patchMulti<TEntity>(url: string, body?: any, progressCallback: (percent: number) => void = null): Promise<TEntity[]> {
        const response = await xhr<ODataResponseMulti<TEntity>>(url, "PATCH", body, progressCallback);
        return response.value;
    }

    public delete<TEntity>(url: string): Promise<TEntity> {
        return xhr<TEntity>(url, "DELETE", null, null);
    }

    public async deleteMulti<TEntity>(url: string): Promise<TEntity[]> {
        const response = await xhr<ODataResponseMulti<TEntity>>(url, "DELETE", null, null);
        return response.value;
    }
}

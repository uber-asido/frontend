import * as moment from "moment";

import { Inject, forwardRef } from "@angular/core";

import { Binder, ODataService } from "../rest";
import { QueryBuilder } from "../wheeler";

export interface UploadHistory {
    key: string;
    filename: string;
    status: "Pending" | "Done";
    timestamp: moment.Moment;
    timestampFromNow: string;
    errors: string[];
}

export class FileApi {
    private readonly queryBuilder = new QueryBuilder<UploadHistory>();

    constructor(@Inject(forwardRef(() => ODataService)) private readonly odata: ODataService) { }

    public async getUploadHistory(page: number, pageSize: number): Promise<UploadHistory[]> {
        const query = (page > 0 ? this.queryBuilder.skip(pageSize * page) : this.queryBuilder)
            .orderByDescending(e => e.timestamp)
            .top(pageSize);
        const entities = await this.odata.getMulti<UploadHistory>(`/UploadHistory?${query.toQueryString()}`);
        entities.forEach(e => this.bind(e));
        return entities;
    }

    public getUploadHistoryCount(): Promise<number> {
        return this.odata.get<number>(`/UploadHistory/$count`);
    }

    public async uploadFile(file: Blob, progress: (percent: number) => void): Promise<UploadHistory> {
        const body = new FormData();
        body.append("file", file);

        const result = await this.odata.post<UploadHistory>("/UploadFile", body, progress);
        return result;
    }

    public bind(entity: UploadHistory): UploadHistory {
        entity.timestamp = Binder.bindMoment(entity.timestamp);
        entity.timestampFromNow = entity.timestamp.fromNow();
        return entity;
    }
}

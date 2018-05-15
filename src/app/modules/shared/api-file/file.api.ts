import * as moment from "moment";

import { Inject, forwardRef } from "@angular/core";

import { Binder, ODataService } from "../rest";
import { QueryBuilder } from "../wheeler";

export interface UploadHistory {
    key: string;
    filename: string;
    status: "Ongoing" | "Done";
    timestamp: moment.Moment;
    timestampFromNow: string;
    errors: string[];
}

export class FileApi {
    private readonly queryBuilder = new QueryBuilder<UploadHistory>();

    constructor(@Inject(forwardRef(() => ODataService)) private readonly odata: ODataService) { }

    public async getUploadHistory(page: number, pageSize: number): Promise<UploadHistory[]> {
        const query = (page > 0 ? this.queryBuilder.skip(pageSize * page) : this.queryBuilder).top(pageSize);
        const entities = await this.odata.getMulti<UploadHistory>(`/UploadHistory?${query.toQueryString()}`);
        entities.forEach(e => this.bind(e));
        return entities;
    }

    public getUploadHistoryCount(): Promise<number> {
        console.log("TODO: Implement me! getUploadHistoryCount()");
        return Promise.resolve(439);
    }

    private bind(entity: UploadHistory): void {
        entity.timestamp = Binder.bindMoment(entity.timestamp);
        entity.timestampFromNow = entity.timestamp.fromNow();
    }
}

import * as moment from "moment";

import { Inject, forwardRef } from "@angular/core";

import { Binder, ODataService } from "../rest";

export interface UploadHistory {
    key: string;
    filename: string;
    status: "Pending" | "Done";
    timestamp: moment.Moment;
    timestampFromNow: string;
    errors: string[];
}

export class FileApi {
    constructor(@Inject(forwardRef(() => ODataService)) private readonly odata: ODataService) { }

    public async getUploadHistory(page: number, pageSize: number): Promise<UploadHistory[]> {
        const entities = await this.odata.getMulti<UploadHistory>(`/UploadHistory?$skip=${pageSize * page}&$top=${pageSize}&$orderby=timestamp desc`);
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

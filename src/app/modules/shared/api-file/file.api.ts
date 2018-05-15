import * as moment from "moment";

import { Inject, forwardRef } from "@angular/core";

import { Binder, ODataService } from "../rest";
import { QueryBuilder } from "../wheeler";

export interface UploadHistory {
    key: string;
    filename: string;
    status: "Ongoing" | "Done";
    timestamp: moment.Moment;
    errors: string[];
}

export class FileApi {
    private readonly queryBuilder = new QueryBuilder<UploadHistory>();

    constructor(@Inject(forwardRef(() => ODataService)) private readonly odata: ODataService) { }

    public async getUploadHistory(): Promise<UploadHistory[]> {
        const entities = await this.odata.getMulti<UploadHistory>("/UploadHistory");
        entities.forEach(e => this.bind(e));
        return entities;
    }

    private bind(entity: UploadHistory): void {
        entity.timestamp = Binder.bindMoment(entity.timestamp);
    }
}

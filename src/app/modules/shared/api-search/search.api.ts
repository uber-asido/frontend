import { Inject, forwardRef } from "@angular/core";

import { ODataService } from "../rest";

export enum SearchItemType {
    freeText = 1,
    movie,
    person,
    organization,
}

export interface SearchItem {
    key: string;
    text: string;
    type: SearchItemType;
}

export class SearchApi {
    constructor(@Inject(forwardRef(() => ODataService)) private readonly odata: ODataService) { }

    public async getSearchItems(textFilter: string, count: number): Promise<SearchItem[]> {
        textFilter = encodeURIComponent(textFilter.toLowerCase());
        const entities = await this.odata.getMulti<SearchItem>(`/SearchItem?$filter=contains(tolower(text), '${textFilter}')&$top=${count}`);
        entities.forEach(e => this.bind(e));
        return entities;
    }

    public bind(entity: SearchItem): SearchItem {
        const type: any = entity.type;
        if (type === "Movie") {
            entity.type = SearchItemType.movie;
        } else if (type === "Organization") {
            entity.type = SearchItemType.organization;
        } else if (type === "Person") {
            entity.type = SearchItemType.person;
        } else {
            throw Error(`Unknown type: ${type}`);
        }

        return entity;
    }
}

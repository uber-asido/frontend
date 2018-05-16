import { Injectable } from "@angular/core";

import { SearchApi, SearchItem, SearchItemType } from "../shared/api-search";

export { SearchItem, SearchItemType };

export class FilmLocation {
    constructor(
        public readonly latitude: number,
        public readonly longitude: number,
        public readonly title: string
    ) { }
}

export class MapState {
    public locations: FilmLocation[] = [];
    public loadingLocations = false;
    public currentSearch: SearchItem = null;
}

@Injectable()
export class MapService {
    public readonly state = new MapState();

    constructor(private readonly searchApi: SearchApi) {
        this.state.locations = Array.from(Array(1000).keys())
            .map(e => new FilmLocation(37.0 + Math.random(), -123.0 + Math.random(), ""));
    }

    public autocompleteSearch(text: string): Promise<SearchItem[]> {
        return this.searchApi.getSearchItems(text, 20);
    }

    public setCurrentSearch(search: SearchItem): void {
        this.state.currentSearch = search;
    }
}

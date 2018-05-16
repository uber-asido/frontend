import { Injectable } from "@angular/core";

import { FilmingLocationApi, FilmingLocation } from "../shared/api-filming-location";
import { SearchApi, SearchItem, SearchItemType } from "../shared/api-search";

export { FilmingLocation, SearchItem, SearchItemType };

export class MapState {
    public locations: FilmingLocation[] = [];
    public loadingLocations = false;
    public currentSearch: SearchItem = null;
}

@Injectable()
export class MapService {
    public readonly state = new MapState();

    constructor(
        private readonly filmingLocationApi: FilmingLocationApi,
        private readonly searchApi: SearchApi
    ) {
    }

    public fetchAutocompletion(text: string): Promise<SearchItem[]> {
        return this.searchApi.getSearchItems(text, 20);
    }

    public async fetchFilmingLocations(forSearchItem: SearchItem): Promise<void> {
        this.state.locations = await this.filmingLocationApi.getFilmingLocations();
    }

    public setCurrentSearch(search: SearchItem): void {
        this.state.currentSearch = search;
    }
}

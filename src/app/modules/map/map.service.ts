import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

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
        private readonly searchApi: SearchApi,
        private readonly snackbar: MatSnackBar
    ) {
    }

    public fetchAutocompletion(text: string): Promise<SearchItem[]> {
        return this.searchApi.getSearchItems(text, 20);
    }

    public async setCurrentSearch(search: SearchItem): Promise<void> {
        this.state.currentSearch = search;

        this.state.loadingLocations = true;
        try {
            if (search) {
                if (search.type === SearchItemType.freeText) {
                    this.state.locations = await this.filmingLocationApi.searchByFreeText(search.text);
                } else {
                    this.state.locations = await this.filmingLocationApi.searchBySearchItem(search.key);
                }
            } else {
                this.state.locations = await this.filmingLocationApi.all();
            }
        } catch (error) {
            console.warn(error);
            this.snackbar.open("Failed to load locations :(", "Dismiss", { duration: 5000 });
        } finally {
            this.state.loadingLocations = false;
        }
    }
}

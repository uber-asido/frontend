import { Injectable } from "@angular/core";

export enum SearchItemType {
    freeText = 1,
    movie,
    person,
    organization,
}

export class SearchItem {
    constructor(
        public readonly text: string,
        public readonly type: SearchItemType
    ) { }
}

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
    public autocompletion: SearchItem[] = [
        new SearchItem("300", SearchItemType.movie),
        new SearchItem("Brad Pitt", SearchItemType.person),
        new SearchItem("Garry Oldman", SearchItemType.person),
        new SearchItem("Lady Bird", SearchItemType.movie),
        new SearchItem("Nicolas Cage", SearchItemType.person),
        new SearchItem("Martin Sheen", SearchItemType.person),
        new SearchItem("Truth or Dare", SearchItemType.movie),
        new SearchItem("Columbia Pictures", SearchItemType.organization),
        new SearchItem("Warner Bros", SearchItemType.organization),
        new SearchItem("Paramount Pictures", SearchItemType.organization)
    ];
}

@Injectable()
export class MapService {
    public readonly state = new MapState();

    constructor() {
        this.state.locations = Array.from(Array(1000).keys())
            .map(e => new FilmLocation(37.0 + Math.random(), -123.0 + Math.random(), ""));
    }

    public setCurrentSearch(search: SearchItem): void {
        this.state.currentSearch = search;
    }
}

import { Injectable } from "@angular/core";

export class FilmLocation {
    constructor(
        public readonly latitude: number,
        public readonly longitude: number,
        public readonly title: string
    ) { }
}

export class MapState {
    public locations: FilmLocation[] = [];
}

@Injectable()
export class MapService {
    public readonly state = new MapState();

    constructor() {
        this.state.locations = Array.from(Array(1000).keys())
            .map(e => new FilmLocation(37.0 + Math.random(), -123.0 + Math.random(), ""));
    }
}

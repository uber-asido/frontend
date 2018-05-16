import * as moment from "moment";

import { Inject, forwardRef } from "@angular/core";

import { Binder, ODataService } from "../rest";
import { Expression } from "../wheeler";

export interface FilmingLocation {
    movieKey: string;
    latitude: number;
    longitude: number;
    formattedAddress: string;
    funFact: string;
}

export class FilmingLocationApi {
    constructor(@Inject(forwardRef(() => ODataService)) private readonly odata: ODataService) { }

    public async getFilmingLocations(): Promise<FilmingLocation[]> {
        // Optimization - select properties that are needed for the UI only.
        const select = [
            Expression.nameof<FilmingLocation, string>(e => e.movieKey),
            Expression.nameof<FilmingLocation, number>(e => e.latitude),
            Expression.nameof<FilmingLocation, number>(e => e.longitude)
        ].join(",");
        const entities = await this.odata.get<FilmingLocation[]>(`/FilmingLocation?$select=${encodeURIComponent(select)}`);
        return entities;
    }
}

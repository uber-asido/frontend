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
    // Optimization - select properties that are needed for the UI only.
    private static readonly odataSelect = encodeURIComponent([
        Expression.nameof<FilmingLocation, string>(e => e.movieKey),
        Expression.nameof<FilmingLocation, number>(e => e.latitude),
        Expression.nameof<FilmingLocation, number>(e => e.longitude)
    ].join(","));

    constructor(@Inject(forwardRef(() => ODataService)) private readonly odata: ODataService) { }

    public all(): Promise<FilmingLocation[]> {
        return this.odata.get<FilmingLocation[]>(`/FilmingLocation?$select=${FilmingLocationApi.odataSelect}`);
    }

    public searchByFreeText(text: string): Promise<FilmingLocation[]> {
        return this.odata.getMulti<FilmingLocation>(`/FilmingLocation/Service.SearchByFreeText(text='${encodeURIComponent(text)}')?$select=${FilmingLocationApi.odataSelect}`);
    }

    public searchBySearchItem(searchItemKey: string): Promise<FilmingLocation[]> {
        return this.odata.getMulti<FilmingLocation>(`/FilmingLocation/Service.SearchBySearchItem(searchItemKey='${encodeURIComponent(searchItemKey)}')?$select=${FilmingLocationApi.odataSelect}`);
    }
}

import * as moment from "moment";

import { Inject, forwardRef } from "@angular/core";

import { FilmingLocation } from "../api-filming-location";
import { Binder, ODataService } from "../rest";
import { Expression } from "../wheeler";

export interface Actor {
    key: string;
    fullName: string;
}

export interface Director {
    key: string;
    fullName: string;
}

export interface Writer {
    key: string;
    fullName: string;
}

export interface Distributor {
    key: string;
    name: string;
}

export interface ProductionCompany {
    key: string;
    name: string;
}

export interface Movie {
    key: string;
    title: string;
    releaseYear: number;
    actors: Actor[];
    directors: Director[];
    writers: Writer[];
    distributors: Distributor[];
    productionCompanies: ProductionCompany[];
    filmingLocations: FilmingLocation[];
}

export class MovieApi {
    constructor(@Inject(forwardRef(() => ODataService)) private readonly odata: ODataService) { }

    public get(key: string): Promise<Movie> {
        return this.odata.get<Movie>(`/Movie(${key})`);
    }
}

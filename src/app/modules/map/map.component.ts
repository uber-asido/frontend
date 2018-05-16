import { Component, OnInit } from '@angular/core';

import { FilmingLocation, MapService } from "./map.service";
import { Location } from "./google-map";

@Component({
    selector: 'ub-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    public get locations() { return this.mapService.state.locations; }

    constructor(private readonly mapService: MapService) { }

    ngOnInit() {
        this.mapService.fetchFilmingLocations(null);
    }

    public onLocationSelected(location: FilmingLocation): void {
        console.log(location);
    }
}

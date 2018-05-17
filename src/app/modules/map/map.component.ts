import { Component } from '@angular/core';

import { FilmingLocation, MapService } from "./map.service";
import { Location } from "./google-map";

@Component({
    selector: 'ub-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent {
    public get locations() { return this.mapService.state.locations; }

    constructor(private readonly mapService: MapService) { }

    public onLocationSelected(location: FilmingLocation): void {
        console.log(location);
    }
}

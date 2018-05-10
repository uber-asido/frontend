import { Component } from '@angular/core';

import { FilmLocation, MapService } from "./map.service";
import { Location } from "./google-map.component";

@Component({
    selector: 'ub-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent {
    public get locations() { return this.mapService.state.locations; }

    constructor(private readonly mapService: MapService) { }

    public onLocationSelected(location: FilmLocation): void {
        console.log(location);
    }
}

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
    public get selectedSearchItem() { return this.mapService.state.selectedSearchItem; }
    public get selectedMovie() { return this.mapService.state.selectedMovie; }

    constructor(private readonly mapService: MapService) { }

    public async onLocationSelected(location: FilmingLocation): Promise<void> {
        await this.mapService.selectMovie(location.movieKey);
    }

    public onLocationDeselected(): void {
        this.mapService.selectSearchItem(null);
    }
}

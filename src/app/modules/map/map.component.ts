import { Component } from '@angular/core';

import { FilmLocation } from "./google-map.component";

@Component({
    selector: 'ub-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent {
    public onLocationSelected(location: FilmLocation): void {
        console.log(location);
    }
}

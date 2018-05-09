import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from "@angular/material";

import { GoogleMapLoader } from "./google-map.loader";

declare var google: any;

@Component({
    selector: 'ub-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
    @ViewChild("map") mapRef: ElementRef;

    private map: any;

    constructor(
        private readonly snackbar: MatSnackBar,
        private readonly googleMapLoader: GoogleMapLoader
    ) { }

    ngAfterViewInit() {
        this.googleMapLoader.load().then(() => {
            this.map = new google.maps.Map(this.mapRef.nativeElement, {
                center: { lat: 37.773972, lng: -122.431297 },
                zoom: 12
            });
        });
    }
}

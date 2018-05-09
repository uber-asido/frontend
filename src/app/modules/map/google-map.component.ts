import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from "@angular/material";

import { GoogleMapLoader } from "./google-map.loader";

declare var google: any;
declare var MarkerClusterer: any;

export class FilmLocation {
    constructor(
        public readonly latitude: number,
        public readonly longitude: number,
        public readonly title: string
    ) { }
}

@Component({
    selector: 'ub-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements AfterViewInit {
    @ViewChild("map") mapRef: ElementRef;

    private readonly filmLocations: FilmLocation[] = [
        new FilmLocation(37.779872, -122.439197, "Test location"),
        new FilmLocation(37.779072, -122.436337, "Another location")
    ];

    private map: any;
    private markers: any[] = [];
    private clusterer: any;

    constructor(
        private readonly snackbar: MatSnackBar,
        private readonly googleMapLoader: GoogleMapLoader
    ) { }

    async ngAfterViewInit() {
        try {
            await this.googleMapLoader.load();
        } catch (error) {
            console.log(error);
            this.snackbar.open("Failed to load Google Map :(");
        }

        this.map = new google.maps.Map(this.mapRef.nativeElement, this.config);

        for (let i = 0; i < 1000; ++i) {
            this.filmLocations.push(new FilmLocation(37.0 + Math.random(), -123.0 + Math.random(), ""));
        }
        
        this.addMarkers(this.filmLocations);
    }

    private addMarkers(filmLocations: FilmLocation[]): void {
        if (!this.map) {
            throw Error("!map");
        }

        filmLocations.forEach(location => {
            const marker = new google.maps.Marker({
                map: this.map,
                title: location.title,
                position: new google.maps.LatLng(location.latitude, location.longitude)
            });
            this.markers.push(marker);
        });

        if (this.clusterer) {
            this.clusterer.setMap(null);
        }
        this.clusterer = new MarkerClusterer(this.map, this.markers);
    }

    private readonly config = {
        center: { lat: 37.773972, lng: -122.431297 },
        zoom: 12,
        disableDefaultUI: true,
        styles: [
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]
    };
}

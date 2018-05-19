import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from "@angular/material";

import { GoogleMapLoader } from "./google-map.loader";

declare var google: any;
declare var MarkerClusterer: any;

export interface Location {
    latitude: number;
    longitude: number;
}

class MarkerIcon {
    public static readonly deselected = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    public static readonly selected = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
}

@Component({
    selector: 'ub-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements AfterViewInit, OnChanges {
    @Input() locations: Location[];
    @Output() readonly locationSelected = new EventEmitter<Location>();
    @Output() readonly locationDeselected = new EventEmitter<void>();

    @ViewChild("map") mapRef: ElementRef;

    private map: any;
    private markers: any[] = [];
    private selectedMarker: any;
    private clusterer: any;

    constructor(
        private readonly zone: NgZone,
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

        google.maps.event.addListener(this.map, "click", () => {
            this.deselectMarker();
        });

        this.resetMarkers();
    }

    ngOnChanges(changes: SimpleChanges) {
        const locations = changes["locations"];
        if (locations) {
            this.resetMarkers();
        }
    }

    public deselectMarker(): void {
        if (this.selectedMarker) {
            this.selectedMarker.setIcon(MarkerIcon.deselected);
            this.selectedMarker = null;
            this.zone.run(() => this.locationDeselected.emit());
        }
    }

    private resetMarkers(): void {
        if (!this.map) {
            return;
        }

        this.deselectMarker();

        if (this.clusterer) {
            this.clusterer.setMap(null);
        }

        this.markers.forEach(m => {
            google.maps.event.clearInstanceListeners(m);
            m.setMap(null);
        });
        this.markers = [];

        this.locations.forEach(location => {
            const marker = new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(location.latitude, location.longitude),
                icon: MarkerIcon.deselected
            });

            marker.addListener("click", () => {
                if (this.selectedMarker) {
                    this.selectedMarker.setIcon(MarkerIcon.deselected);
                }
                this.selectedMarker = marker;
                marker.setIcon(MarkerIcon.selected);
                this.zone.run(() => this.locationSelected.emit(location));
            });

            this.markers.push(marker);
        });
        
        this.clusterer = new MarkerClusterer(this.map, this.markers);
        this.clusterer.setMaxZoom(21);
    }

    private readonly config = {
        center: { lat: 37.773972, lng: -122.431297 },
        zoom: 12,
        disableDefaultUI: true,
        clickableIcons: false,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#d6e2e6"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#cfd4d5"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#7492a8"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "lightness": 25
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dde2e3"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#cfd4d5"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dde2e3"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#7492a8"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dde2e3"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#588ca4"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": -100
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a9de83"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#bae6a1"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c6e8b3"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#bae6a1"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#41626b"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": -45
                    },
                    {
                        "lightness": 10
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c1d1d6"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#a6b5bb"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#9fb6bd"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": -70
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b4cbd4"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#588ca4"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#008cb5"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit.station.airport",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": -5
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a6cbe3"
                    }
                ]
            }
        ]
    };
}

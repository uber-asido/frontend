import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule, MatButtonModule, MatDividerModule, MatIconModule, MatInputModule, MatListModule, MatOptionModule, MatProgressSpinnerModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule } from "@angular/material";

import { ApiFilmingLocationModule } from "../shared/api-filming-location";
import { ApiMovieModule } from "../shared/api-movie";
import { ApiSearchModule } from "../shared/api-search";
import { ScriptLoaderModule } from "../shared/script-loader";
import { MapService } from "./map.service";
import { MapComponent } from "./map.component";
import { GoogleMapComponent, GoogleMapLoader } from "./google-map";
import { MovieDetailsComponent } from "./movie-details";
import { SearchInputComponent, SearchItemIconPipe } from "./search";
import { routes } from "./map.routes";

@NgModule({
    declarations: [
        GoogleMapComponent,
        MapComponent,
        MovieDetailsComponent,
        SearchInputComponent,
        SearchItemIconPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MatAutocompleteModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatOptionModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatTooltipModule,

        ApiFilmingLocationModule,
        ApiMovieModule,
        ApiSearchModule,
        ScriptLoaderModule,

        routes
    ],
    providers: [
        GoogleMapLoader,
        MapService
    ]
})
export class MapModule { }

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule, MatButtonModule, MatDividerModule, MatIconModule, MatInputModule, MatOptionModule, MatProgressSpinnerModule, MatSnackBarModule, MatTooltipModule } from "@angular/material";

import { ApiFilmingLocationModule } from "../shared/api-filming-location";
import { ApiSearchModule } from "../shared/api-search";
import { ScriptLoaderModule } from "../shared/script-loader";
import { MapService } from "./map.service";
import { MapComponent } from "./map.component";
import { GoogleMapComponent, GoogleMapLoader } from "./google-map";
import { SearchInputComponent, SearchItemIconPipe } from "./search";
import { routes } from "./map.routes";

@NgModule({
    declarations: [
        GoogleMapComponent,
        MapComponent,
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
        MatOptionModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTooltipModule,

        ApiFilmingLocationModule,
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

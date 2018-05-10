import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule, MatButtonModule, MatIconModule, MatInputModule, MatOptionModule, MatSnackBarModule } from "@angular/material";

import { ScriptLoaderModule } from "../shared/script-loader";
import { GoogleMapLoader } from "./google-map.loader";
import { MapService } from "./map.service";
import { MapComponent } from "./map.component";
import { GoogleMapComponent } from "./google-map.component";
import { SearchInputComponent } from "./search-input.component";
import { routes } from "./map.routes";

@NgModule({
    declarations: [
        GoogleMapComponent,
        MapComponent,
        SearchInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MatAutocompleteModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSnackBarModule,

        ScriptLoaderModule,
        routes
    ],
    providers: [
        GoogleMapLoader,
        MapService
    ]
})
export class MapModule { }

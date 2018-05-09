import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material";

import { ScriptLoaderModule } from "../shared/script-loader";
import { GoogleMapLoader } from "./google-map.loader";
import { MapComponent } from "./map.component";
import { routes } from "./map.routes";

@NgModule({
    declarations: [
        MapComponent
    ],
    imports: [
        MatSnackBarModule,

        ScriptLoaderModule,
        routes
    ],
    providers: [
        GoogleMapLoader
    ]
})
export class MapModule { }

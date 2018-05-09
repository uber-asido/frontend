import { NgModule } from "@angular/core";

import { MapComponent } from "./map.component";
import { routes } from "./map.routes";

@NgModule({
    imports: [
        routes
    ],
    declarations: [
        MapComponent
    ]
})
export class MapModule { }

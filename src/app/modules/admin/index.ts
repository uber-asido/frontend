import { NgModule } from "@angular/core";

import { AdminComponent } from "./admin.component";
import { routes } from "./admin.routes";

@NgModule({
    imports: [
        routes
    ],
    declarations: [
        AdminComponent
    ]
})
export class AdminModule { }

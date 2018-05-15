import { NgModule } from "@angular/core";

import { ApiFileModule } from "../shared/api-file";
import { AdminComponent } from "./admin.component";
import { routes } from "./admin.routes";

@NgModule({
    imports: [
        ApiFileModule,
        routes
    ],
    declarations: [
        AdminComponent
    ]
})
export class AdminModule { }

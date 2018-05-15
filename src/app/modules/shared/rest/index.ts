import { NgModule } from "@angular/core";

import { Binder } from "./binder";
import { HttpService } from "./http.service";
import { ODataService } from "./odata.service";

@NgModule({
    providers: [HttpService, ODataService]
})
export class RestModule { }

export { Binder, HttpService, ODataService };

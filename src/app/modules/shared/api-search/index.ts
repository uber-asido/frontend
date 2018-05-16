import { NgModule } from "@angular/core";

import { RestModule } from "../rest";
import { SearchApi, SearchItem, SearchItemType } from "./search.api";

@NgModule({
    imports: [RestModule],
    providers: [SearchApi]
})
export class ApiSearchModule { }

export { SearchApi, SearchItem, SearchItemType };

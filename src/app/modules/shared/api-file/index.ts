import { NgModule } from "@angular/core";

import { RestModule } from "../rest";
import { FileApi, UploadHistory } from "./file.api";

@NgModule({
    imports: [RestModule],
    providers: [FileApi]
})
export class ApiFileModule { }

export { FileApi, UploadHistory };

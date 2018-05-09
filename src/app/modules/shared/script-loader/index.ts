import { NgModule } from "@angular/core";

import { ScriptLoader } from "./script-loader.service";

@NgModule({
    providers: [ScriptLoader]
})
export class ScriptLoaderModule { }

export { ScriptLoader };

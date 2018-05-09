import { NgModule } from "@angular/core";

import { DocumentRef } from "./document-ref";
import { WindowRef } from "./window-ref";

@NgModule({
    providers: [DocumentRef, WindowRef]
})
export class BrowserGlobalsModule { }

export { DocumentRef, WindowRef };

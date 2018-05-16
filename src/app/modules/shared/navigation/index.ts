import { NgModule } from "@angular/core";

import { NavigationService } from "./navigation.service";

@NgModule({
    providers: [NavigationService]
})
export class NavigationModule { }

export { NavigationService };

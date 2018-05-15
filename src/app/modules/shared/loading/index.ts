import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressBarModule, MatProgressSpinnerModule } from "@angular/material";

import { LoadingComponent } from "./loading.component";

@NgModule({
    imports: [
        CommonModule,

        MatProgressBarModule,
        MatProgressSpinnerModule
    ],
    declarations: [LoadingComponent],
    exports: [LoadingComponent]
})
export class LoadingModule { }

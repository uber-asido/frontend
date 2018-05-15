import { Component, Input } from "@angular/core";

import { InputConverter, BooleanConverter, NumberConverter } from "core/input-converter";

@Component({
    selector: "ub-loading",
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
    @Input() @InputConverter(NumberConverter) progress: number;
    @Input() @InputConverter(BooleanConverter) noBackground: number;

    public get hasProgress() { return this.progress !== undefined && this.progress !== null; }
}

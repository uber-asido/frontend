import { Component, Input } from "@angular/core";

@Component({
    selector: "ub-section-content",
    templateUrl: './section-content.component.html',
    styleUrls: ['./section-content.component.scss'],
    host: { "[style.max-width]": "maxWidth" }
})
export class SectionContentComponent {
    @Input() maxWidth = "900px";
}

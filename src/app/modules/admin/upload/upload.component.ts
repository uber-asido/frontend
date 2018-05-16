import { Component } from "@angular/core";

import { UploadService } from "./upload.service";
import { NavigationService } from "../../shared/navigation";

@Component({
    selector: 'ub-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
    public get uploadHistory() { return this.uploadService.state.uploadHistory; }

    constructor(
        private readonly navigationService: NavigationService,
        private readonly uploadService: UploadService
    ) { }

    public onBack(): void {
        this.navigationService.goToIndex();
    }
}

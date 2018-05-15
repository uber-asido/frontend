import { Component } from "@angular/core";

import { UploadService } from "./upload.service";

@Component({
    selector: 'ub-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
    public get uploadHistory() { return this.uploadService.state.uploadHistory; }

    constructor(private readonly uploadService: UploadService) { }
}

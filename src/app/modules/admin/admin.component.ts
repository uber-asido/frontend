import { AfterViewInit, Component } from '@angular/core';

import { FileApi } from "../shared/api-file";

@Component({
    selector: 'ub-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit {
    constructor(private readonly fileApi: FileApi) { }

    async ngAfterViewInit() {
        const history = await this.fileApi.getUploadHistory();
        console.log(history);
    }
}

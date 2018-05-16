import { Component, EventEmitter } from "@angular/core";
import { UploadInput, UploadFile, UploadStatus, UploadOutput } from "ngx-uploader";

import { environment } from "environments/environment";
import { FileApi } from "../../../shared/api-file";
import { ODataService } from "../../../shared/rest";
import { UploadService } from "../upload.service";

@Component({
    selector: "ub-file",
    templateUrl: "./file.component.html",
    styleUrls: ["./file.component.scss"]
})
export class FileComponent {
    public file: UploadFile;
    public uploadInput = new EventEmitter<UploadInput>();
    public error: string;

    constructor(
        private readonly fileApi: FileApi,
        private readonly odataService: ODataService,
        private readonly uploadService: UploadService
    ) { }

    onUploadOutput(output: UploadOutput): void {
        if (output.type === "allAddedToQueue") {
            this.error = null;

            this.uploadInput.emit({
                type: "uploadAll",
                url: environment.apiUrl + "/UploadFile",
                method: "POST",
                fieldName: "file"
            });
        } else if (output.type === "uploading" && typeof output.file !== "undefined") {
            this.file = output.file;
        } else if (output.type === "done") {
            const response = output.file.response;
            if (output.file.responseStatus === 200) {
                const history = this.fileApi.bind(response);
                this.uploadService.appendUploadHistory(history);
            } else if (output.file.responseStatus === 400) {
                if (response.error) {
                    const errors = this.odataService.parseError(response.error);
                    if (errors.length > 0) {
                        this.error = errors[0].message;
                    }
                }
            }
        }

        if (this.file && this.file.progress.status === UploadStatus.Done) {
            this.file = null;
        }
    }
}

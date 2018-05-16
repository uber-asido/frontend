import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

import { FileApi, UploadHistory } from "../../shared/api-file";

export { UploadHistory };

export class UploadState {
    public loading = false;
    public uploadHistory: UploadHistory[] = [];
    public uploadHistoryCount = 0;

    public page = 0;
    public readonly pageSize = 4;
}

@Injectable()
export class UploadService {
    public readonly state = new UploadState();

    constructor(
        private readonly fileApi: FileApi,
        private readonly snackbar: MatSnackBar
    ) { }

    public appendUploadHistory(history: UploadHistory): void {
        const copy = this.state.uploadHistory.slice(0);
        if (copy.length === this.state.pageSize) {
            copy.pop();
        }
        copy.push(history);
        copy.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1);
        this.state.uploadHistory = copy;
    }

    public async reloadUploadHistory(): Promise<void> {
        this.state.loading = true;

        try {
            const historyTask = this.fileApi.getUploadHistory(0, this.state.pageSize);
            const historyCountTask = this.fileApi.getUploadHistoryCount();

            this.state.uploadHistory = await historyTask;
            this.state.uploadHistoryCount = await historyCountTask;

            this.state.page = 0;
        } catch (error) {
            console.warn(error);
            this.snackbar.open("Failed to reload upload history :(", null, { duration: 4000 });
        } finally {
            this.state.loading = false;
        }
    }

    public async loadPage(page: number): Promise<void> {
        this.state.loading = true;

        try {
            this.state.uploadHistory = await this.fileApi.getUploadHistory(page, this.state.pageSize);
            this.state.page = page;
        } catch (error) {
            this.snackbar.open("Failed to load upload history :(", null, { duration: 4000 });
        } finally {
            this.state.loading = false;
        }
    }
}

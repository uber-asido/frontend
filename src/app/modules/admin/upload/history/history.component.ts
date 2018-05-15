import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSort, MatTableDataSource, PageEvent } from "@angular/material";

import { UploadHistory, UploadService } from "../upload.service";

@Component({
    selector: "ub-history",
    templateUrl: "./history.component.html",
    styleUrls: ["./history.component.scss"]
})
export class HistoryComponent implements OnInit, OnChanges {
    @Input() uploadHistory: UploadHistory[];

    public readonly displayedColumns = ["filename", "timestamp", "status"];
    public readonly dataSource = new MatTableDataSource([]);
    public get pageSize() { return this.uploadService.state.pageSize; }
    public get tableSize() { return this.uploadService.state.uploadHistoryCount; }
    public get loading() { return this.uploadService.state.loading; }

    constructor(private readonly uploadService: UploadService) { }

    async ngOnInit() {
        await this.uploadService.reloadUploadHistory();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const uploadHistory = changes["uploadHistory"];
        if (uploadHistory) {
            this.dataSource.data = uploadHistory.currentValue;
        }
    }

    public onPage(event: PageEvent): Promise<void> {
        return this.uploadService.loadPage(event.pageIndex);
    }
}

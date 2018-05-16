import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule, MatIconModule, MatPaginatorModule, MatProgressSpinnerModule, MatSnackBarModule, MatTableModule, MatToolbarModule, MatTooltipModule } from "@angular/material";
import { NgUploaderModule } from "ngx-uploader";

import { ApiFileModule } from "../../shared/api-file";
import { CardModule } from "../../shared/card";
import { LoadingModule } from "../../shared/loading";
import { SectionContentModule } from "../../shared/section-content";

import { FileComponent, StatusComponent } from "./file";
import { HistoryComponent } from "./history";
import { UploadComponent } from "./upload.component";
import { UploadService } from "./upload.service";

import { routes } from "./upload.routes";

@NgModule({
    imports: [
        CommonModule,

        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,

        NgUploaderModule,

        ApiFileModule,
        CardModule,
        LoadingModule,
        SectionContentModule,

        routes
    ],
    declarations: [
        FileComponent,
        HistoryComponent,
        StatusComponent,
        UploadComponent
    ],
    providers: [UploadService]
})
export class UploadModule { }


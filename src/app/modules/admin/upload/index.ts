import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule, MatIconModule, MatPaginatorModule, MatSnackBarModule, MatTableModule, MatToolbarModule } from "@angular/material";

import { ApiFileModule } from "../../shared/api-file";
import { LoadingModule } from "../../shared/loading";

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
        MatSnackBarModule,
        MatTableModule,
        MatToolbarModule,

        ApiFileModule,
        LoadingModule,

        routes
    ],
    declarations: [
        HistoryComponent,
        UploadComponent
    ],
    providers: [UploadService]
})
export class UploadModule { }


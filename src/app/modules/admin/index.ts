import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule, MatIconModule, MatPaginatorModule, MatSnackBarModule, MatTableModule, MatToolbarModule } from "@angular/material";

import { ApiFileModule } from "../shared/api-file";
import { LoadingModule } from "../shared/loading";

import { HistoryComponent, UploadComponent, UploadService } from "./upload";

import { AdminComponent } from "./admin.component";
import { routes } from "./admin.routes";

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
        AdminComponent,
        HistoryComponent,
        UploadComponent
    ],
    providers: [UploadService]
})
export class AdminModule { }

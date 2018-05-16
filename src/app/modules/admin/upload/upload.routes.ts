import { Routes, RouterModule } from '@angular/router';

import { UploadComponent } from "./upload.component";

const _routes: Routes = [
    { path: "", component: UploadComponent }
];

export const routes = RouterModule.forChild(_routes);

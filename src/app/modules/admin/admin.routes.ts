import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const _routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "upload" },
    {
        path: "", component: AdminComponent, children: [
            { path: "upload", loadChildren: "app/modules/admin/upload/index#UploadModule" }
        ]
    }
];

export const routes = RouterModule.forChild(_routes);

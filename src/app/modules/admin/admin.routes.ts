import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const _routes: Routes = [
    { path: "", component: AdminComponent }
];

export const routes = RouterModule.forChild(_routes);

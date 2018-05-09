import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map.component';

const _routes: Routes = [
    { path: "", component: MapComponent }
];

export const routes = RouterModule.forChild(_routes);

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from "./app.component";

const _routes: Routes = [
    { path: "", redirectTo: "map", pathMatch: "full" },
    { path: "admin", loadChildren: "./modules/admin/index#AdminModule" },
    { path: "map", loadChildren: "./modules/map/index#MapModule" }
];

export const routes = RouterModule.forRoot(_routes);

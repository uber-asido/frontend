import { NgModule } from "@angular/core";

import { RestModule } from "../rest";
import { FilmingLocationApi, FilmingLocation } from "./filming-location.api";

@NgModule({
    imports: [RestModule],
    providers: [FilmingLocationApi]
})
export class ApiFilmingLocationModule { }

export { FilmingLocationApi, FilmingLocation };

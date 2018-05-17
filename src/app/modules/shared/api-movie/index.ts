import { NgModule } from "@angular/core";

import { RestModule } from "../rest";
import { Actor, Director, Distributor, Movie, MovieApi, ProductionCompany, Writer } from "./movie.api";

@NgModule({
    imports: [RestModule],
    providers: [MovieApi]
})
export class ApiMovieModule { }

export { Actor, Director, Distributor, Movie, MovieApi, ProductionCompany, Writer };

import { Component, Input } from "@angular/core";

import { Movie } from "../../shared/api-movie";

@Component({
    selector: 'ub-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
    @Input() movie: Movie;
}

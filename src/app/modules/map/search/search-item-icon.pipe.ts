import { Pipe, PipeTransform } from "@angular/core";

import { SearchItemType } from "./search-input.component";

@Pipe({name: "searchItemIcon"})
export class SearchItemIconPipe implements PipeTransform{
    transform(type: SearchItemType): string {
        switch (type) {
            case SearchItemType.freeText: return "title";
            case SearchItemType.movie: return "local_movies";
            case SearchItemType.organization: return "business";
            case SearchItemType.person: return "person";
            default: throw Error(`Unknown type: ${type}`);
        }
    }
}

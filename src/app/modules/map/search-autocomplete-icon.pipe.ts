import { Pipe, PipeTransform } from "@angular/core";

import { AutocompleteItemType } from "./search-input.component";

@Pipe({name: "searchAutocompleteIcon"})
export class SearchAutocompleteIconPipe implements PipeTransform{
    transform(type: AutocompleteItemType): string {
        switch (type) {
            case AutocompleteItemType.Movie: return "movie";
            case AutocompleteItemType.Organization: return "business";
            case AutocompleteItemType.Person: return "person";
            default: throw Error(`Unknown type: ${type}`);
        }
    }
}

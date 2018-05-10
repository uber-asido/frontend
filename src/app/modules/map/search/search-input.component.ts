import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

export enum SearchItemType {
    freeText = 1,
    movie,
    person,
    organization,
}

export class SearchItem {
    constructor(
        public readonly text: string,
        public readonly type: SearchItemType
    ) { }
}

@Component({
    selector: 'ub-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
    @ViewChild("searchInput") searchInputRef: ElementRef;
    private get searchInput(): HTMLInputElement { return this.searchInputRef.nativeElement; }

    public readonly searchControl = new FormControl();
    public readonly autocompleteOptions: Observable<SearchItem[]> = this.searchControl.valueChanges.pipe(
        startWith<string | SearchItem>(""), // start with an empty string to make sure completion is shown on first focus.
        map(value => typeof value === "string"? value : value.text),
        map(value => this.hardcodedAutocomplete.filter(e => e.text.toLowerCase().includes(value.toLowerCase())))
    );

    public displayFunction(item?: SearchItem): string {
        return item ? item.text : undefined;
    }

    public onSearchClick(): void {
        this.searchInput.focus();
    }

    public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
        console.log(event.option.value);
    }

    private hardcodedAutocomplete: SearchItem[] = [
        new SearchItem("300", SearchItemType.movie),
        new SearchItem("Brad Pitt", SearchItemType.person),
        new SearchItem("Garry Oldman", SearchItemType.person),
        new SearchItem("Lady Bird", SearchItemType.movie),
        new SearchItem("Nicolas Cage", SearchItemType.person),
        new SearchItem("Martin Sheen", SearchItemType.person),
        new SearchItem("Truth or Dare", SearchItemType.movie),
        new SearchItem("Columbia Pictures", SearchItemType.organization),
        new SearchItem("Warner Bros", SearchItemType.organization),
        new SearchItem("Paramount Pictures", SearchItemType.organization)
    ];
}

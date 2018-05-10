import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

export enum AutocompleteItemType {
    Movie = 1,
    Person,
    Organization
}

export class AutocompleteItem {
    constructor(
        public readonly text: string,
        public readonly type: AutocompleteItemType
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
    public readonly autocompleteOptions: Observable<AutocompleteItem[]> = this.searchControl.valueChanges.pipe(
        startWith(""), // start with an empty string to make sure completion is shown on first focus.
        map(val => {
            val = val.toLowerCase();
            return this.hardcodedAutocomplete.filter(e => e.text.toLowerCase().includes(val));
        })
    );

    public onSearchClick(): void {
        this.searchInput.focus();
    }

    private hardcodedAutocomplete: AutocompleteItem[] = [
        new AutocompleteItem("300", AutocompleteItemType.Movie),
        new AutocompleteItem("Brad Pitt", AutocompleteItemType.Person),
        new AutocompleteItem("Garry Oldman", AutocompleteItemType.Person),
        new AutocompleteItem("Lady Bird", AutocompleteItemType.Movie),
        new AutocompleteItem("Nicolas Cage", AutocompleteItemType.Person),
        new AutocompleteItem("Martin Sheen", AutocompleteItemType.Person),
        new AutocompleteItem("Truth or Dare", AutocompleteItemType.Movie),
        new AutocompleteItem("Columbia Pictures", AutocompleteItemType.Organization),
        new AutocompleteItem("Warner Bros", AutocompleteItemType.Organization),
        new AutocompleteItem("Paramount Pictures", AutocompleteItemType.Organization)
    ];
}

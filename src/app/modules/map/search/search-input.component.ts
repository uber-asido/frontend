import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { SearchItem, SearchItemType } from "../map.service";

@Component({
    selector: 'ub-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
    @Input() autocompletion: SearchItem[];

    @ViewChild("searchInput") searchInputRef: ElementRef;
    private get searchInput(): HTMLInputElement { return this.searchInputRef.nativeElement; }

    public readonly searchControl = new FormControl();
    public readonly autocompleteOptions: Observable<SearchItem[]> = this.searchControl.valueChanges.pipe(
        startWith<string | SearchItem>(""), // start with an empty string to make sure completion is shown on first focus.
        map(value => typeof value === "string"? value : value.text),
        map(value => this.autocompletion.filter(e => e.text.toLowerCase().includes(value.toLowerCase())))
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
}

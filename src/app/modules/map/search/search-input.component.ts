import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material";
import { Observable } from "rxjs";
import { flatMap, map, startWith, tap } from "rxjs/operators";

import { MapService, SearchItem, SearchItemType } from "../map.service";

enum Action {
    search = 1,
    loading,
    clear
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
        map(value => value.trim().toLowerCase()),
        tap(value => { if (!value) this.clearCurrentSearch(); }),
        flatMap(value => this.mapService.fetchAutocompletion(value))
    );

    public get Action() { return Action; }
    public get visibleAction() {
        const state = this.mapService.state;
        if (!state.loadingLocations && !state.currentSearch) {
            return Action.search;
        } else if (state.loadingLocations) {
            return Action.loading;
        } else if (state.currentSearch) {
            return Action.clear;
        } else {
            throw Error("Can't decide visible action");
        }
    }

    constructor(private readonly mapService: MapService) { }

    public displayFunction(item?: SearchItem): string {
        return item ? item.text : undefined;
    }

    public optionTooltip(item: SearchItem): string {
        switch (item.type) {
            case SearchItemType.movie: return "Movie";
            case SearchItemType.organization: return "Organization";
            case SearchItemType.person: return "Person";
            default: throw Error(`Unknown type: ${JSON.stringify(item)}`);
        }
    }

    public onActionSearch(): void {
        this.searchInput.focus();
    }

    public onActionClear(): void {
        this.clearCurrentSearch();
    }

    public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
        const searchItem = event.option.value;
        this.mapService.setCurrentSearch(searchItem);
    }

    private clearCurrentSearch(): void {
        if (this.searchControl.value) {
            this.searchControl.setValue("");
        }
        this.mapService.setCurrentSearch(null);
    }
}

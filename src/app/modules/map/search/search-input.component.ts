import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from "@angular/material";
import { Observable } from "rxjs";
import { debounceTime, flatMap, map, startWith, tap } from "rxjs/operators";

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
export class SearchInputComponent implements OnChanges {
    @Input() selectedSearchItem: SearchItem;

    @ViewChild("searchInput") searchInputRef: ElementRef;
    private get searchInput(): HTMLInputElement { return this.searchInputRef.nativeElement; }

    @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;

    public readonly searchControl = new FormControl();
    public readonly autocompleteOptions: Observable<SearchItem[]> = this.searchControl.valueChanges.pipe(
        startWith<string | SearchItem>(""), // start with an empty string to make sure completion is shown on first focus.
        map(value => typeof value === "string"? value : value.text),
        map(value => value.trim().toLowerCase()),
        tap(value => { if (!value) this.clearCurrentSearch(); }),
        debounceTime(200),
        flatMap(value => this.mapService.fetchAutocompletion(value))
    );

    public get Action() { return Action; }
    public get visibleAction() {
        const state = this.mapService.state;
        if (!state.loadingLocations && !state.selectedSearchItem) {
            return Action.search;
        } else if (state.loadingLocations) {
            return Action.loading;
        } else if (state.selectedSearchItem) {
            return Action.clear;
        } else {
            throw Error("Can't decide visible action");
        }
    }

    constructor(private readonly mapService: MapService) { }

    ngOnChanges(changes: SimpleChanges) {
        const searchItem = changes["selectedSearchItem"];
        if (searchItem && searchItem.currentValue) {
            this.searchInput.value = searchItem.currentValue.text;
        }
    }

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

    public onEnter(): void {
        const value = this.searchInput.value.trim();
        if (!value) {
            return;
        }

        this.setCurrentSearch({
            key: null,
            text: value,
            type: SearchItemType.freeText
        });
    }

    public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
        this.setCurrentSearch(event.option.value);
    }

    private clearCurrentSearch(): void {
        if (this.searchControl.value) {
            this.searchControl.setValue("");
        }
        this.mapService.selectSearchItem(null);
    }

    private setCurrentSearch(item: SearchItem): void {
        this.searchInput.blur();
        this.autocompleteTrigger.closePanel();
        this.mapService.selectSearchItem(item);
    }
}

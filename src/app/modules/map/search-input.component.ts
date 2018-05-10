import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


export class State {
    constructor(public name: string, public population: string, public flag: string) { }
}

@Component({
    selector: 'ub-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
    @ViewChild("searchInput") searchInputRef: ElementRef;
    private get searchInput(): HTMLInputElement { return this.searchInputRef.nativeElement; }

    public readonly searchControl = new FormControl();

    public states: State[] = [
        {
          name: 'Arkansas',
          population: '2.978M',
          flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
        },
        {
          name: 'California',
          population: '39.14M',
          flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
        },
        {
          name: 'Florida',
          population: '20.27M',
          flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
        },
        {
          name: 'Texas',
          population: '27.47M',
          flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
        }
    ];
    public autocompleteOptions: Observable<State[]>;

    ngOnInit() {
        this.autocompleteOptions = this.searchControl.valueChanges.pipe(map(val => {
            val = val.toLowerCase();
            return this.states.filter(e => e.name.toLowerCase().includes(val));
        }));
    }

    public onSearchClick(): void {
        this.searchInput.focus();
    }
}

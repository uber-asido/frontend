import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class NavigationService {
    constructor(private readonly router: Router) { }

    public goToIndex(): void {
        this.router.navigate(["/"]);
    }

    public goToAdmin(): void {
        this.router.navigate(["/admin"]);
    }

    public goToMap(): void {
        this.router.navigate(["/map"]);
    }
}

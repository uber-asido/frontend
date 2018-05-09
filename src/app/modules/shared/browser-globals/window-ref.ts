import { Injectable } from "@angular/core";

@Injectable()
export class WindowRef {
    public get nativeWindow() { return window; }
}

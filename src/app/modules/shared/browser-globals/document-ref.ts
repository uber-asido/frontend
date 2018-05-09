import { Injectable } from "@angular/core";

@Injectable()
export class DocumentRef {
    public get nativeDocument() { return document; }
}

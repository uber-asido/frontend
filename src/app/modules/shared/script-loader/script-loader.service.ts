import { Injectable } from "@angular/core";

import { DocumentRef, WindowRef } from "../browser-globals";

@Injectable()
export class ScriptLoader {
    private readonly scriptClass = "ub-script-loader";
    private readonly pendingLoads = new Map<string, Promise<void>>();

    constructor(
        private readonly windowRef: WindowRef,
        private readonly documentRef: DocumentRef
    ) { }

    public load(url: string, callbackName: string = null): Promise<void> {
        const ongoingLoad = this.pendingLoads.get(url);
        if (ongoingLoad) {
            return ongoingLoad;
        }

        const script = this.documentRef.nativeDocument.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;
        script.classList.add(this.scriptClass);
        script.src = url;

        const promise = new Promise<void>((resolve: Function, reject: Function) => {
            this.windowRef.nativeWindow[callbackName] = () => {
                this.cleanupLoad(url, callbackName);
                resolve();
            };

            script.onerror = (error: Event) => {
                this.cleanupLoad(url, callbackName);
                reject(error);
            };
        });

        this.pendingLoads.set(url, promise);

        this.documentRef.nativeDocument.body.appendChild(script);
        return promise;
    }

    private cleanupLoad(url: string, callbackName: string): void {
        delete window[callbackName];
        this.pendingLoads.delete(url);
    }
}

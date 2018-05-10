import { Injectable } from "@angular/core";

import { environment } from "environments/environment";
import { WindowRef } from "../../shared/browser-globals";
import { ScriptLoader } from "../../shared/script-loader";

@Injectable()
export class GoogleMapLoader {
    constructor(
        private readonly windowRef: WindowRef,
        private readonly scriptLoader: ScriptLoader
    ) { }

    public load(): Promise<void> {
        const window = this.windowRef.nativeWindow;
        if (window["google"] && window["google"]["map"]) {
            return Promise.resolve();
        }

        const promise = this.scriptLoader.load(`https://maps.googleapis.com/maps/api/js?key=${environment.mapApiKey}&callback=UbGoogleMapLoaded`, "UbGoogleMapLoaded");
        return promise;
    }
}

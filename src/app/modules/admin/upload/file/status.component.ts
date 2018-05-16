import { Component, Input } from "@angular/core";

import { UploadHistory } from "../upload.service";

enum State {
    ongoing = 1,
    done,
    error
};

@Component({
    selector: "ub-status",
    templateUrl: "./status.component.html",
    styleUrls: ["./status.component.scss"]
})
export class StatusComponent {
    @Input() uploadHistory: UploadHistory;

    public errorMessage: string;

    public get State(): typeof State { return State; }
    public get state(): State {
        let _state: State;

        if (!this.uploadHistory) {
            _state = null;
        } else {
            if (this.uploadHistory.status === "Pending") {
                _state = State.ongoing;
            } else if (this.uploadHistory.status === "Done") {
                if (this.uploadHistory.errors.length === 0) {
                    _state = State.done;
                } else {
                    _state = State.error;
                }
            } else {
                throw Error(`Unknown status: ${this.uploadHistory.status}`);
            }

            if (this.uploadHistory.errors.length > 0) {
                this.errorMessage = this.uploadHistory.errors[0];
            } else {
                this.errorMessage = null;
            }
        }

        return _state;
    }
}

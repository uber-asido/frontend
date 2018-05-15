import { environment } from "environments/environment";

export async function xhr<TResponse>(url: string, method: string, body: any, progressCallback: (percent: number) => void): Promise<TResponse> {
    let request = new XMLHttpRequest();

    let promise = new Promise<TResponse>((resolve, reject) => {
        if (progressCallback) {
            request.upload.onprogress = event => {
                if (event.lengthComputable) {
                    // event.loaded the bytes the browser received
                    // event.total the total bytes set by the header
                    var percent = (event.loaded / event.total) * 100;
                    progressCallback(percent);
                }
            };
        }
        request.onload = event => {
            if (request.status === 204) {
                resolve(null);
            } else if (request.status >= 200 && request.status < 300) {
                const contentType = request.getResponseHeader("Content-Type");
                if (contentType) {
                    let response = request.responseText;
                    if (contentType.startsWith("application/json")) {
                        response = response ? JSON.parse(response) : null;
                    }
                    resolve(<TResponse><any>response);
                } else {
                    resolve(<any>request.response);
                }
            } else {
                reject(request.response);
            }
        };
        request.onerror = event => {
            const contentType = request.getResponseHeader("Content-Type")
            if (contentType && contentType.startsWith("application/json")) {
                reject(JSON.parse(request.response));
            } else {
                reject(request.statusText);
            }
        };
    });

    url = environment.apiUrl + url;

    request.open(method, url);
    request.setRequestHeader("Accept", "application/json");

    if (body) {
        if (body instanceof FormData) {
            request.send(body);
        } else {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(JSON.stringify(body));
        }
    } else {
        request.send();
    }

    return promise;
}

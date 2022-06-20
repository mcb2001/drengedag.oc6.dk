export abstract class AbstractController {
    protected baseUrl: string;

    protected constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected async getRequest<TResponse>(path: string): Promise<TResponse> {
        const requestInit: RequestInit = {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer"
        };

        const response: Response = await window.fetch(this.baseUrl + path, requestInit);

        return await response.json();
    }

    protected async postRequest<TRequest, TResponse>(path: string, body: TRequest): Promise<TResponse> {
        const requestInit: RequestInit = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(body)
        };

        const response: Response = await window.fetch(this.baseUrl + path, requestInit);

        return await response.json();
    }

    protected async putRequest<TRequest, TResponse>(path: string, body: TRequest): Promise<TResponse> {
        const requestInit: RequestInit = {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(body)
        };

        const response: Response = await window.fetch(this.baseUrl + path, requestInit);

        return await response.json();
    }

    protected async deleteRequest(path: string): Promise<void> {
        const requestInit: RequestInit = {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer"
        };

        const response: Response = await window.fetch(this.baseUrl + path, requestInit);
    }
}

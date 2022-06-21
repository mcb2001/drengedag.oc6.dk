const DEFAULT_REQUEST_INIT: RequestInit = {
    mode: "cors",
    cache: "no-cache",
    headers: {
        "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer"
};

export abstract class AbstractController {
    protected baseUrl: string;

    protected constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected getRequestInit = (method: "GET" | "POST" | "PUT" | "DELETE", token: string) => ({
        ...DEFAULT_REQUEST_INIT,
        headers: {
            ...DEFAULT_REQUEST_INIT.headers,
            "authorization": "Bearer " + token
        },
        method: method
    });

    protected submitRequestInit<TRequest>(method: "POST" | "PUT", token: string, body: TRequest): RequestInit {
        return {
            ...this.getRequestInit(method, token),
            body: JSON.stringify(body)
        };
    }

    protected async getRequest<TResponse>(path: string, token: string): Promise<TResponse> {
        const requestInit: RequestInit = this.getRequestInit("GET", token);

        const response: Response = await window.fetch(this.baseUrl + path, requestInit);

        await this.isSuccessfull(response);

        return await response.json();
    }

    protected async postRequest<TRequest, TResponse>(path: string, token: string, body: TRequest): Promise<TResponse> {
        const requestInit: RequestInit = this.submitRequestInit("POST", token, body);

        const response: Response = await window.fetch(this.baseUrl + path, requestInit);

        await this.isSuccessfull(response);

        return await response.json();
    }

    protected async putRequest<TRequest, TResponse>(path: string, token: string, body: TRequest): Promise<TResponse> {
        const requestInit: RequestInit = this.submitRequestInit("PUT", token, body);

        const response: Response = await window.fetch(this.baseUrl + path, requestInit);

        await this.isSuccessfull(response);

        return await response.json();
    }

    protected async deleteRequest(path: string, token: string): Promise<void> {
        const requestInit: RequestInit = this.getRequestInit("DELETE", token);

        const response: Response = await window.fetch(this.baseUrl + path, requestInit);

        await this.isSuccessfull(response);
    }

    private async isSuccessfull(response: Response): Promise<void> {
        if (response.status >= 300) {
            const text = await response.text();

            throw new Error(response.statusText + "\n" + text);
        }
    }
}

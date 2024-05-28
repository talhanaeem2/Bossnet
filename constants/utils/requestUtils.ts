import IError from "../../interfaces/IError";
import IResponse from "../../interfaces/IResponse";

const requestUtils = {
    baseHeaders: {
        'Accept': 'application/json',
    },

    async request<R, T extends BodyInit | null | undefined>(
        url: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
        body?: T,
        extraHeaders: HeadersInit = {},
        isFormData?: boolean
    ): Promise<R> {
        const headers = {
            ...this.baseHeaders,
            ...extraHeaders,
        };

        const options: RequestInit = {
            method,
            headers: isFormData ? extraHeaders : { ...headers, 'Content-Type': 'application/json' },
            body: isFormData ? body : JSON.stringify(body),
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorText = `HTTP error! Status: ${response.status} -> ${response.statusText}`;
                console.error(errorText);
                throw new Error(errorText);
            }
            const result: IResponse<R> = await response.json();

            const successResult = result as IResponse<R>;
            return successResult.data;
        } catch (error) {
            console.error('Request failed:', error);
            throw error;
        }
    },
};

export default requestUtils;

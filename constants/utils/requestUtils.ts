import IResponse from "../../interfaces/IResponse";

const requestUtils = {
    baseHeaders: { 'Content-Type': 'application/json' },

    async request<R, T>(
        url: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
        body?: T,
        extraHeaders: Record<string, string> = {},
    ): Promise<R> {
        const headers = {
            ...this.baseHeaders,
            ...extraHeaders,
        };

        const options: RequestInit = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                const errorText = `HTTP error! Status: ${response.status} -> ${response.statusText}`;
                console.error(errorText);
                throw new Error(errorText);
            }
            const result: IResponse<R> = await response.json();

            return result.data;
        } catch (error) {
            console.error('Request error:', error);
            throw error;
        }
    },
};

export default requestUtils;
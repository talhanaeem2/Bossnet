import IError from "../../interfaces/IError";
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

            // if (!response.ok) {
            //     const errorText = `HTTP error! Status: ${response.status} -> ${response.statusText}`;
            //     console.error(errorText);
            //     throw new Error(errorText);
            // }
            const result: unknown = await response.json();

            if (isError(result)) {
                const errorResult = result as IError;
                console.error('Error:', errorResult.message);
                throw new Error(errorResult.message);
            }

            const successResult = result as IResponse<R>;
            return successResult.data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },
};

function isError(result: any): result is IError {
    return result && result.status === false && 'message' in result;
}

export default requestUtils;
import IErrorResponse from "../../interfaces/IErrorResponse";
import IResponse from "../../interfaces/IResponse";
import MediaUploadResponse from "../interfaces/apisInterfaces/mediaUploadResponse";
import MediaUploadResponseData from "../interfaces/apisInterfaces/mediaUploadResponseData";

const requestUtils = {
    baseHeaders: { 'Accept': 'application/json', },

    async request<R, T>(
        url: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
        body?: T,
        extraHeaders: HeadersInit = {},
        isFormData = false
    ): Promise<R> {
        const headers = {
            ...this.baseHeaders,
            ...extraHeaders,
        };
        // @ts-ignore: Unreachable code error
        const options: RequestInit = isFormData ? {
            method,
            headers: extraHeaders,
            body: body,
        }
            : {
                method,
                headers: { ...headers, 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (!response.ok) {
                const errorResult = result as IErrorResponse;
                console.error(`HTTP error! Status: ${response.status} -> ${errorResult.message}`);
                throw new Error(errorResult.message);
            }

            const successResult = result as IResponse<R> | MediaUploadResponse;
            return (successResult as IResponse<R>).data || (successResult as MediaUploadResponse).filePath as MediaUploadResponseData[] as R;
        } catch (error) {
            console.error('Request failed:', error);
            throw error;
        }
    },
};

export default requestUtils;
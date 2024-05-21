import axios from 'axios';
import { HTTP_STATUS_UNAUTHORIZED } from '@/app/lib/httpStatusCodes';
import { BACKCHECK_API_KEY, BACKCHECK_API_ROUTE, BACKCHECK_URL } from '@/app/config/envVariables';

export type HttpHeaders = {
    authorization?: string;
    'Content-Type'?: string;
    [key: string]: string | undefined;
}

const TOKEN_EXPIRED = 'The Token is expired.';

const TIMEOUT = 2500;
const BEARER = 'Bearer';


const httpService = axios.create({
    timeout: TIMEOUT,
    baseURL: `${BACKCHECK_URL}${BACKCHECK_API_ROUTE}`,
    headers: {
        common: {
            'X-API-Key': BACKCHECK_API_KEY,
        },
    },
});

httpService.interceptors.response.use(
    response => response,
    error => {
        console.error(error);
        if (error.response.status === HTTP_STATUS_UNAUTHORIZED) {
            if (error.response.data.message === TOKEN_EXPIRED) {
                //TODO: throw error to be caught by the error boundary 
                error.response.data.message = 'Token expired. Please login again.';
            }
        }
        return Promise.reject(error);
    }
);

export default httpService;

export function getAuthHeaders(user_token: string | unknown, contentType?: string): HttpHeaders {
    const headers: HttpHeaders = {
        authorization: `${BEARER} ${user_token}`,
    };

    if (contentType) {
        headers['Content-Type'] = contentType;
    }

    return headers;
}
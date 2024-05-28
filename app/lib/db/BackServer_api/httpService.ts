import axios from 'axios';
import { HTTP_STATUS_UNAUTHORIZED } from '@/app/lib/httpStatusCodes';
import { BACKCHECK_API_KEY, BACKCHECK_API_ROUTE, BACKCHECK_URL } from '@/app/config/envVariables';
import { SERVER_DOWN, TOKEN_EXPIRED } from '@/app/lib/errors/apiErrorMessages';

const SERVER_DOWN_CODE = 'ECONNREFUSED';

export type HttpHeaders = {
    authorization?: string;
    'Content-Type'?: string;
    [key: string]: string | undefined;
}

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
        if (error.code === SERVER_DOWN_CODE) {
            error.message = SERVER_DOWN
            return Promise.reject(error);
        }
        if (error.response) {
            if (error.response.status === HTTP_STATUS_UNAUTHORIZED && error.response.data) {
                error.message = TOKEN_EXPIRED;
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
import axios from 'axios';

const httpService = axios.create({
    timeout: 2500,
    baseURL: `${process.env.BACKCHECK_URL}${process.env.BACKCHECK_API_ROUTE}`,
    headers: {
        common: {
            'X-API-Key': process.env.BACKCHECK_API_KEY, 
        },
    },
});

httpService.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            if (error.response.data.message === 'The Token is expired.') {
                
            }
        }
        return Promise.reject(error);
    }
);

export default httpService;
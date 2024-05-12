'use server'
import axios from "axios";

const instance = axios.create();

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out

// TODO: Change this for site properties
instance.defaults.timeout = 2500;
instance.defaults.baseURL = 'http://127.0.0.1:6699/checkup_api';
instance.defaults.headers.common['X-API-Key'] = "iHQ^msSp;jmG3!ZWO.1y2%*^SX;JmSniI-wHHjam=33fQzmwkwCg-du*drhVaLtA";

// Override timeout for this request as it's known to take a long time

export async function get_user_blog_headers(user_token: string | unknown) {

    try {
        const { data } = await instance.get('/blog/list', {
            headers: { authorization: `Bearer ${user_token}` }
        });


        return "blogs" in data ? (data.blogs == null ? [] : data.blogs) : []

    } catch (error: any) {
        console.log(error.response)
        return []
    }

}

export async function create_user_blog(user_token: string | unknown, blog: FormData) {

    try {
        const { data } = await instance.post('/blog/create', blog, {
            headers: {
                authorization: `Bearer ${user_token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return "blog" in data ? true : false

    } catch (error: any) {
        console.log(error.response)
    }

}
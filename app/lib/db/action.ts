'use server'
import * as jose from "jose"
import axios from "axios";

const instance = axios.create();

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out

// TODO: Change this for site properties
instance.defaults.timeout = 2500;
instance.defaults.baseURL = 'http://127.0.0.1:6699/checkup_api';
instance.defaults.headers.common['X-API-Key'] = "iHQ^msSp;jmG3!ZWO.1y2%*^SX;JmSniI-wHHjam=33fQzmwkwCg-du*drhVaLtA";

const secret = new TextEncoder().encode(process.env.SECRET_KEY)

// Override timeout for this request as it's known to take a long time


export async function user_exists(external: string) {
    const issuer = 'Check'
    const audience = 'Back Check'

    const header = { alg: 'dir', enc: 'A256CBC-HS512' }

    const jwt = await new jose.EncryptJWT({ 'external': external })
        .setProtectedHeader(header)
        .setIssuedAt()
        .setIssuer(issuer)
        .setAudience(audience)
        .setExpirationTime('10m')
        .encrypt(secret)


    try {
        const { data } = await instance.get('/login', {
            data: jwt,
            validateStatus: function (status) {
                return status < 500;
            }
        });

        return "user" in data ? data.user : ""

    } catch (error) {
        console.log(error)
    }

}

export async function create_user(external: string, username: string) {
    const issuer = 'Create_Profile'
    const audience = 'Back Check'

    const header = { alg: 'dir', enc: 'A256CBC-HS512' }

    const jwt = await new jose.EncryptJWT({ 'external': external, 'username': username })
        .setProtectedHeader(header)
        .setIssuedAt()
        .setIssuer(issuer)
        .setAudience(audience)
        .setExpirationTime('10m')
        .encrypt(secret)

    try {
        await instance.get('/users/create', {
            data: jwt,
        });

        return true

    } catch (error) {
        console.log(error)
        return false
    }

}
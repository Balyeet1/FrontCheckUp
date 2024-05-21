import * as jose from "jose"
import { SECRET_KEY, ENCODING_ALGORITHM, AUDIENCE } from '@/app/config/envVariables';

const secret = new TextEncoder().encode(SECRET_KEY)

export async function create_token(body: {}, issuer: string): Promise<string> {

    const header = {
        alg: 'dir',
        enc: ENCODING_ALGORITHM,
    }

    return await new jose.EncryptJWT(body)
        .setProtectedHeader(header)
        .setIssuedAt()
        .setIssuer(issuer)
        .setAudience(AUDIENCE)
        .setExpirationTime('1m')
        .encrypt(secret)

}
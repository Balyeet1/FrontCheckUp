import * as jose from "jose"

const secret = new TextEncoder().encode(process.env.SECRET_KEY)

export async function create_token(body: {}, issuer: string): Promise<string> {

    const header = {
        alg: 'dir',
        enc: process.env.ENCODING_ALGORITHM ?? '',
    }

    return await new jose.EncryptJWT(body)
        .setProtectedHeader(header)
        .setIssuedAt()
        .setIssuer(issuer)
        .setAudience(process.env.AUDIENCE ?? '') 
        .setExpirationTime('1m')
        .encrypt(secret)

}
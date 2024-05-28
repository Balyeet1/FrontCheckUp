import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';
import { checkServerStatus } from '@/app/lib/db/BackServer_api/api';
import { AUTH0_BASE_URL } from '@/app/config/envVariables';

const afterCallback = async (req, session, state) => {
    const isServerOnline = await checkServerStatus();
    if (!isServerOnline) {
        return false;
    }

    return session;
};

export const GET = handleAuth({
    login: handleLogin(() => ({
        returnTo: `${AUTH0_BASE_URL}/my-blogs`
    })),
    callback: handleCallback({ afterCallback })
});

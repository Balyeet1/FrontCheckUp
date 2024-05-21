import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';
import { userExists, createUser } from '@/app/lib/db/BackServer_api/user_api_action';
import { checkServerStatus } from '@/app/lib/db/BackServer_api/api';
import { AUTH0_BASE_URL } from '@/app/config/envVariables';

const afterCallback = async (req, session, state) => {
    const isServerOnline = await checkServerStatus();
    if (!isServerOnline) {
        return false;
    }

    const external = session.user.sub.split("|")[1];
    const userToken = await userExists(external) || await createUserAndExists(external, session.user.name);

    session.user.token = userToken;

    return session;
};

const createUserAndExists = async (external, username) => {
    try {
        const success = await createUser(external, username);
        if (!success) {
            console.log("Failed to create user");
            throw new Error("Something went wrong");
        }
        return await userExists(external);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const GET = handleAuth({
    login: handleLogin(() => ({
        returnTo: `${AUTH0_BASE_URL}/my-blogs`
    })),
    callback: handleCallback({ afterCallback })
});

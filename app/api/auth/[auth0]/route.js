import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';
import { userExists, createUser } from '@/app/lib/db/BackServer_api/user_api_action';
import { checkServerStatus } from '@/app/lib/db/BackServer_api/api';

const afterCallback = async (req, session, state) => {
    if (!(await checkServerStatus())) {
        return false;
    }

    const external = session.user.sub.split("|")[1];
    let userToken = await userExists(external);

    if (userToken === "") {
        const username = session.user.name || "User";
        const success = await createUser(external, username);

        if (!success) {
            console.log("Failed to create user");
            return res.status(500).send("Something went wrong");
        }

        userToken = await userExists(external);
    }

    session.user.token = userToken;

    return session;
};

export const GET = handleAuth({
    login: handleLogin(() => ({
        returnTo: `${process.env.AUTH0_BASE_URL}/my-blogs`
    })),
    callback: handleCallback({ afterCallback })
});

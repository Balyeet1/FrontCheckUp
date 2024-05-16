import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';
import { user_exists, create_user } from '@/app/lib/db/user_api_action';

const afterCallback = async (req, session, state) => {

    const external = session.user.sub.split("|")[1]

    let user_token = await user_exists(external)

    if (user_token == "") {

        const username = session.user.name ? session.user.name : "User"
        const success = await create_user(external, username)

        if (!success) {
            console.log("Failed to create user")
            return res.status(500).send("Something went wrong")
        }

        user_token = await user_exists(external)
    }

    session.user['token'] = user_token

    return session;
};

export const GET = handleAuth({
    login: handleLogin(() => {
        return {
            returnTo: `${process.env.AUTH0_BASE_URL}/my-blogs`
        };
    }),
    callback: handleCallback({ afterCallback })
});

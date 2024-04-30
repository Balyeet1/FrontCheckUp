import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';
import { user_exists } from '@/app/lib/db/action';

const afterCallback = async (req, session, state) => {

    const external = session.user.sub.split("|")[1]

    const user_token = await user_exists(external)

    console.log(user_token)

    if (user_token == "") {
        state.returnTo = "http://localhost:3000/setup"
    }

    session.user['token'] = user_token

    return session;
};

export const GET = handleAuth({
    login: handleLogin(() => {
        return {
            returnTo: "http://localhost:3000/my-blogs"
        };
    }),
    callback: handleCallback({ afterCallback })
});

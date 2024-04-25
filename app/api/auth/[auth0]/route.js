import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
    login: handleLogin((req) => {
        return {
            returnTo: "http://localhost:3000/my-blogs"
        };
    })
});

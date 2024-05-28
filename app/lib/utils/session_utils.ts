import { NextRequest, NextResponse } from "next/server";
import { parseCookies } from "nookies";
import { userExists, createUser } from '@/app/lib/db/BackServer_api/user_api_action';
import { getSession } from "@auth0/nextjs-auth0";

export async function getUserToken(req: NextRequest): Promise<string> {

    const cookies = parseCookies({ req });

    if (cookies.token) {
        console.log("Token found in cookies");
        return cookies.token;
    }

    const response = NextResponse.next(req);

    const session = await getSession();
    const external = session?.user.sub.split("|")[1];
    const userToken = await userExists(external) || await createUserAndExists(external, session?.user.name);


    response.cookies.set('token', userToken ?? "")

    return userToken ?? "";
}

const createUserAndExists = async (external: string, username: string) => {
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


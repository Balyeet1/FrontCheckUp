import { getSession } from "@auth0/nextjs-auth0";

export async function getUserToken(): Promise<string> {
    const session = await getSession();
    const user = session?.user;
    return user?.token ?? "";
}
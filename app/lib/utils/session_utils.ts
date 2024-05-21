import { getSession, Session } from "@auth0/nextjs-auth0";

export async function getUserToken(): Promise<string> {
    const session: Session | null | undefined = await getSession();

    if (!session) {
        throw new Error("Session not found");
    }

    const user = session.user;

    if (!user?.token) {
        throw new Error("User token not found");
    }

    return user.token;
}
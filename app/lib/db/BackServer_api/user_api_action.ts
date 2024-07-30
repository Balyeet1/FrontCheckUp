import httpService from "@/app/lib/db/BackServer_api/httpService";
import { create_token } from "@/app/lib/utils/token_utils";
import { HTTP_STATUS_INTERNAL_SERVER_ERROR } from "@/app/lib/httpStatusCodes";
import { userEndpoints } from "@/app/lib/db/BackServer_api/endpoints_paths";

export async function userExists(external: string): Promise<string | null> {

    const issuer = 'Check';

    const user_data = { "data": await create_token({ 'external': external }, issuer) }

    try {
        const { data } = await httpService.post(userEndpoints.Login, user_data, {
            headers: { 'Content-Type': 'application/json' },
            validateStatus: (status) => status < HTTP_STATUS_INTERNAL_SERVER_ERROR
        });

        return data.user ?? null;
    } catch (error: any) {
        console.error(error);
        return null;
    }
}

export async function createUser(external: string, username: string): Promise<boolean> {

    const issuer = 'Create_Profile';

    const data = { 'Token': await create_token({ 'external': external, 'username': username }, issuer) };

    try {
        await httpService.post(userEndpoints.CreateUser, data, {
            headers: { 'Content-Type': 'application/json' }
        });

        return true;
    } catch (error: any) {
        console.error(error);
        return false;
    }
}
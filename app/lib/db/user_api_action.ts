import httpService from "@/app/lib/http_service"
import { create_token } from "@/app/lib/token_utils"


export async function user_exists(external: string) {
    const issuer = 'Check'

    try {
        const { data } = await httpService.get('/login', {
            data: await create_token({ 'external': external }, issuer),
            validateStatus: function (status) {
                return status < 500;
            }
        });

        return "user" in data ? data.user : ""

    } catch (error: any) {
        console.log(error.response.data)
    }

}

export async function create_user(external: string, username: string) {
    const issuer = 'Create_Profile'

    try {
        await httpService.get('/users/create', {
            data: await create_token({ 'external': external, 'username': username }, issuer),
        });

        return true

    } catch (error: any) {
        console.log(error.response.data)
        return false
    }

}
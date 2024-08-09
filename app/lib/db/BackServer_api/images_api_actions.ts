"use server"
import httpService, { getAuthHeaders } from '@/app/lib/db/BackServer_api/httpService';
import { imagesEndpoint } from "@/app/lib/db/BackServer_api/endpoints_paths";


export async function get_user_images_list(user_token: string | unknown,): Promise<any> {
    const { data } = await httpService.get(imagesEndpoint.List, {
        headers: getAuthHeaders(user_token),
    });

    return data
}
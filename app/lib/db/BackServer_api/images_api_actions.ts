"use server"
import httpService, { getAuthHeaders } from '@/app/lib/db/BackServer_api/httpService';
import { imagesEndpoint } from "@/app/lib/db/BackServer_api/endpoints_paths";

const MULTIPART_FORM_DATA = 'multipart/form-data';


export async function get_user_images_list(user_token: string | unknown): Promise<any> {
    const { data } = await httpService.get(imagesEndpoint.List, {
        headers: getAuthHeaders(user_token),
    });

    return data
}

export async function store_image(user_token: string | unknown, image: FormData): Promise<any> {
    const { data } = await httpService.post(imagesEndpoint.Store, image, {
        headers: getAuthHeaders(user_token, MULTIPART_FORM_DATA),
    });

    console.log(data)

    return data
}
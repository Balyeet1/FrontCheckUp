'use server'
import httpService from "@/app/lib/db/BackServer_api/httpService";
import { HTTP_STATUS_OK } from "@/app/lib/httpStatusCodes";
import { STATUS_ENDPOINT } from "@/app/lib/db/BackServer_api/endpoints_paths";

export async function checkServerStatus(): Promise<boolean> {

    try {
        const response = await httpService.get(STATUS_ENDPOINT);
        return response.status === HTTP_STATUS_OK;
    } catch (error) {
        console.error(error);
        return false;
    }
}
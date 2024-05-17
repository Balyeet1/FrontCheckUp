'use server'
import httpService from "@/app/lib/http_service";

export async function checkServerStatus(): Promise<boolean> {
    try {
        const response = await httpService.get('/status/');
        return response.status === 200;
    } catch (error) {
        return false;
    }
}
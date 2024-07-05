'use server'
import { revalidatePath } from 'next/cache';
import { createSlug } from "@/app/lib/utils/utils";
import httpService, { getAuthHeaders } from '@/app/lib/db/BackServer_api/httpService';
import { Blog } from '@/app/lib/db/models/definitions';
import { HTTP_STATUS_OK } from '@/app/lib/httpStatusCodes';
import { blogEndpoints } from "@/app/lib/db/BackServer_api/endpoints_paths";

const MULTIPART_FORM_DATA = 'multipart/form-data';


export async function get_user_blog_headers(user_token: string | unknown): Promise<{ blogs: any | null }> {

    const { data } = await httpService.get(blogEndpoints.List, {
        headers: getAuthHeaders(user_token)
    });

    return { blogs: data.blogs ?? null }
}


export async function create_user_blog(user_token: string | unknown, blog: FormData): Promise<object> {

    const { data } = await httpService.post(blogEndpoints.Create, blog, {
        headers: getAuthHeaders(user_token, MULTIPART_FORM_DATA)
    });

    return { response: "blog" in data ? true : false, blog: "blog" in data ? data.blog[0] : null}
}


export async function get_user_blog(user_token: string | unknown, blog_id: number): Promise<{ blog: Blog | null }> {

    const { data } = await httpService.get(blogEndpoints.Get(blog_id), {
        headers: getAuthHeaders(user_token)
    });

    return { blog: data.blog ?? null }
}


export async function delete_user_blog(user_token: string | unknown, blog_id: number): Promise<boolean> {

    const request = await httpService.delete(blogEndpoints.Delete(blog_id), {
        headers: getAuthHeaders(user_token)
    });

    return request.status === HTTP_STATUS_OK
}


export async function update_user_blog(user_token: string | unknown, blog_id: number, blog: FormData): Promise<boolean> {

    const title: string = blog.get("title")?.toString() ?? "Untitled";

    const request = await httpService.put(blogEndpoints.Edit(blog_id), blog, {
        headers: getAuthHeaders(user_token, MULTIPART_FORM_DATA)
    });

    revalidatePath(`/my-blogs/${createSlug(title, blog_id.toString())}`)
    revalidatePath(`/my-blogs/${createSlug(title, blog_id.toString())}/edit`)

    return request.status === HTTP_STATUS_OK

}

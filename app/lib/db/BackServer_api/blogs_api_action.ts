'use server'
import { revalidatePath } from 'next/cache';
import { createSlug } from "@/app/lib/utils/utils";
import httpService from '@/app/lib/http_service';


export async function get_user_blog_headers(user_token: string | unknown) {

    try {
        const { data } = await httpService.get('/blog/list', {
            headers: { authorization: `Bearer ${user_token}` }
        });


        return "blogs" in data ? data.blogs : null

    } catch (error: any) {
        console.log(error.response)
        return null
    }

}

export async function create_user_blog(user_token: string | unknown, blog: FormData) {

    try {
        const { data } = await httpService.post('/blog/create', blog, {
            headers: {
                authorization: `Bearer ${user_token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return "blog" in data ? true : false

    } catch (error: any) {
        console.log(error.response)
    }

}

export async function get_user_blog(user_token: string | unknown, blog_id: number) {

    try {
        const { data } = await httpService.get(`/blog/get?id=${blog_id}`, {
            headers: { authorization: `Bearer ${user_token}` }
        });


        return "blog" in data ? (data.blog == null ? null : data.blog) : null

    } catch (error: any) {
        console.log(error.response)
        return null
    }

}

export async function delete_user_blog(user_token: string | unknown, blog_id: number) {

    try {
        const request = await httpService.delete(`/blog/delete/${blog_id.toString()}`, {
            headers: {
                authorization: `Bearer ${user_token}`,
            },
        });

        return request.status === 200

    } catch (error: any) {
        console.log(error.response)
    }

}

export async function update_user_blog(user_token: string | unknown, blog_id: number, blog: FormData) {

    const title: string = blog.get("title")?.toString() ?? "Untitled";

    try {
        const request = await httpService.put(`/blog/${blog_id}/edit`, blog, {
            headers: {
                authorization: `Bearer ${user_token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        revalidatePath(`/my-blogs/${createSlug(title, blog_id.toString())}`)
        revalidatePath(`/my-blogs/${createSlug(title, blog_id.toString())}/edit`)

        return request.status === 200

    } catch (error: any) {
        console.log(error.response)
    }

}
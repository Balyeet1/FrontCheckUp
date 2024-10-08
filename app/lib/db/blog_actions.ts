import { getIdFromSlug, createSlug } from "@/app/lib/utils/utils";
import { get_user_blog } from "@/app/lib/db/BackServer_api/blogs_api_action";
import { Blog } from "@/app/lib/db/models/definitions";

export async function fetchBlogBySlug(slug: string, token: string): Promise<{ blog: Blog | null }> {
    const blog_id: number = getIdFromSlug(slug);

    if (isNaN(blog_id)) {
        return { blog: null };
    }

    let data = null

    try {
        data = await get_user_blog(token, blog_id);
    } catch {
        return { blog: null };
    }

    //Compare if the slug provided belongs to the blog fetched
    if (data.blog === null || slug !== createSlug(data.blog.title, blog_id.toString())) {
        return { blog: null };
    }

    return { blog: { ...data.blog, id: blog_id } };
}

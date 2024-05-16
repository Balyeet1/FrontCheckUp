import { getIdFromSlug, createSlug } from "@/app/lib/utils";
import { get_user_blog } from "@/app/lib/db/blogs_api_action";
import { Blog } from "./models/definitions";

export async function fetchBlogBySlug(slug: string, token: string): Promise<Blog | null> {
    const blog_id: number = getIdFromSlug(slug);

    if (isNaN(blog_id)) {
        return null;
    }

    const blog: Blog | null = await get_user_blog(token, blog_id);

    if (blog === null) {
        return null;
    }

    if (slug !== createSlug(blog.title, blog_id.toString())) {
        return null;
    }

    return { ...blog, id: blog_id };
}

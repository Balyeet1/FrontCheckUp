import BlogContent from "@/app/components/blog/blog_content";
import { get_user_images_list } from '@/app/lib/db/BackServer_api/images_api_actions';
import { Metadata } from "next";
import { getUserToken } from "@/app/lib/utils/session_utils_sv";
import { fetchBlogBySlug } from "@/app/lib/db/blog_actions";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: 'Edit Blog',
}

export default async function Home({ params }: { params: { slug: string } }) {

  const token = await getUserToken();
  const { blog } = await fetchBlogBySlug(params.slug, token);

  const { images_list } = await get_user_images_list(token)


  if (blog == null) {
    notFound();
  }

  return <BlogContent token={token} blog={blog} images={images_list} />
}
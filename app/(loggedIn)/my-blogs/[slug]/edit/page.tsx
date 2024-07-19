import BlogContent from "@/app/components/blog/blog_content";
import { Metadata } from "next";
import { getUserToken } from "@/app/lib/utils/session_utils";
import { fetchBlogBySlug } from "@/app/lib/db/blog_actions";
import { notFound } from "next/navigation";
import { BACKCHECK_API_ROUTE, BACKCHECK_URL } from "@/app/config/envVariables";

export const metadata: Metadata = {
  title: 'Edit Blog',
}

export default async function Home({ params }: { params: { slug: string } }) {

  const token = await getUserToken();
  const { blog } = await fetchBlogBySlug(params.slug, token);

  if (blog == null) {
    notFound();
  }

  return <BlogContent token={token} blog={blog} imageUrl={`${BACKCHECK_URL}${BACKCHECK_API_ROUTE}`} />
}
import BlogContent from "@/app/components/blog/blog_content";
import { Metadata } from "next";
import { getUserToken } from "@/app/lib/utils/session_utils";
import { BACKCHECK_API_ROUTE, BACKCHECK_URL } from '@/app/config/envVariables';

export const metadata: Metadata = {
  title: 'Create Blog',
}

export default async function Home() {

  const token = await getUserToken()

  return (
    <>
      { /* <BlogForm /> */}
      <BlogContent token={token} imageUrl={`${BACKCHECK_URL}${BACKCHECK_API_ROUTE}`} />
    </>
  );
}
import BlogContent from "@/app/components/blog/blog_content";
import { Metadata } from "next";
import { getUserToken } from "@/app/lib/utils/session_utils";

export const metadata: Metadata = {
  title: 'Create Blog',
}

export default async function Home() {

  const token = await getUserToken()

  return (
    <>
      { /* <BlogForm /> */}
      <BlogContent token={token} />
    </>
  );
}
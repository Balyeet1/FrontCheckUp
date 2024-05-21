import BlogContent from "@/app/components/blog/blog_content";
import { Metadata } from "next";
import { getSession } from "@auth0/nextjs-auth0";



export const metadata: Metadata = {
  title: 'Create Blog',
}

export default async function Home() {
  const session = await getSession();
  const user = session?.user;

  const token: string = typeof user?.token === 'string' ? user?.token : "";

  return (
    <>
      { /* <BlogForm /> */}
      <BlogContent token={token} />
    </>
  );
}
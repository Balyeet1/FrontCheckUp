import BlogContent from "@/app/components/blog/blog_content";
import { Metadata } from "next";
import { getUserToken } from "@/app/lib/utils/session_utils";
import { get_user_images_list } from "@/app/lib/db/BackServer_api/images_api_actions";

export const metadata: Metadata = {
  title: 'Create Blog',
}

export default async function Home() {

  const token = await getUserToken()

  const { images_list } = await get_user_images_list(token)

  return (
    <>
      { /* <BlogForm /> */}
      <BlogContent token={token} images={images_list} />
    </>
  );
}
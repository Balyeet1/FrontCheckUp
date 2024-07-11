import { Metadata } from 'next';
import BlogsList from '@/app/components/blog/blogs_list';
import { getUserToken } from "@/app/lib/utils/session_utils";
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Blogs',
};

export default async function Home() {

  const token = await getUserToken();

  return (
    <section className='pt-4'>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        My blogs
        <Link href={"/my-blogs/create"} className='text-blue-600 ml-2'> Cretate Blog</Link>
      </h1>
      <BlogsList token={token} />
    </section >
  );
}
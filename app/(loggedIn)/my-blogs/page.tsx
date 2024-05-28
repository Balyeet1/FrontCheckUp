import { Metadata } from 'next';
import BlogsList from '@/app/components/blog/blogs_list';
import { getUserToken } from "@/app/lib/utils/session_utils";
import Link from 'next/link';
import { NextRequest, NextResponse } from 'next/server';

export const metadata: Metadata = {
  title: 'My Blogs',
};

export default async function Home({ req }: { req: NextRequest }) {

  const token = await getUserToken(req);

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        My blogs
        <Link href={"/my-blogs/create"} className='text-blue-800'> Cretate Blog</Link>
      </h1>
      <BlogsList token={token} />
    </section >
  );
}
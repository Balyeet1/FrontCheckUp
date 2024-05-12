import { Metadata } from 'next';
import BlogsList from '@/app/ui/blog/blogs_list';
import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Blogs',
};

export default async function Home({ req }: { req: any }) {
  const session = await getSession();
  const user = session?.user;

  const token = typeof user?.token === 'string' ? user?.token : "";

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        My blogs
        <Link href={"/my-blogs/create"} className='text-blue-800'> Cretate Blog</Link>
      </h1>
      <BlogsList token={token} />
    </section>
  );
}
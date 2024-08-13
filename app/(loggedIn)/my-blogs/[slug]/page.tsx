import { Metadata } from 'next';
import BlogDisplayer from '@/app/components/blog/display_blog';
import { notFound } from 'next/navigation';
import { getUserToken } from '@/app/lib/utils/session_utils_sv';
import { fetchBlogBySlug } from '@/app/lib/db/blog_actions';

export const metadata: Metadata = {
  title: 'Blog',
};

const Home = (async ({ params }: { params: { slug: string } }) => {

  const token = await getUserToken();
  const { blog } = await fetchBlogBySlug(params.slug, token);

  if (blog == null) {
    notFound();
  }

  return (
    <BlogDisplayer blog={blog} slug={params.slug} token={token} />
  );
});

export default Home;
"use client"
import { Suspense, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createSlug } from '@/app/lib/utils/utils';
import { get_user_blog_headers } from '@/app/lib/db/BackServer_api/blogs_api_action';
import useApi from '@/app/lib/customHooks/useApi';
import HandleApiError from '@/app/components/error/HandleApiError';

export default function BlogsList({ token, imageUrl }: { token: string, imageUrl: string }) {

    const { data, error, loading, request: getBlogs } = useApi(get_user_blog_headers);

    useEffect(() => {
        getBlogs(token);
    }, []);

    if (error) {
        return <HandleApiError errorMessage={error} />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {data &&
                <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full'>
                    {data.blogs && data.blogs.length > 0 ? (
                        data.blogs.map((blog: { title: string; image: string; id: number }) => (
                            <Link
                                key={blog.id}
                                className='flex flex-wrap flex-col items-center space-y-1 md:mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:scale-1.0'
                                href={`/my-blogs/${createSlug(blog.title, blog.id.toString())}`}
                            >
                                <strong className='w-full flex justify-center'>
                                    <h1 className='text-neutral-900 dark:text-neutral-100 tracking-tight sm:truncate'>{blog.title}</h1>
                                </strong>
                                <Suspense fallback={<p className='h-6'>Loading</p>}>
                                    {blog.image && <RenderImage src={blog.image} alt={blog.title} url={imageUrl} />}
                                </Suspense>
                            </Link>
                        ))
                    ) : (
                        <div>
                            No blogs yet available!{' '}
                            <Link href='/my-blogs/create' className='text-blue-800'>
                                Create one
                            </Link>
                        </div>
                    )}
                </div>
            }
        </>
    );
}

function RenderImage({ url, src, alt }: { url: string, src: string; alt: string }) {

    return (
        <div className='h-60'>
            <Image
                width={200}
                height={300}
                src={`${url}/blog/images/${src}`}
                alt={alt}
                className="object-cover w-full h-full rounded-md"
                priority={true}
            />
        </div>
    );
}

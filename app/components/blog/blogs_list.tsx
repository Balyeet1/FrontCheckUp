"use client"
import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createSlug } from '@/app/lib/utils/utils';
import { get_user_blog_headers } from '@/app/lib/db/BackServer_api/blogs_api_action';
import handleAsyncError from '@/app/lib/apiErrorClientHandler';
import { useRouter } from "next/navigation";

export default function BlogsList({ token }: { token: string }) {

    const router = useRouter();

    const [blogRequest, setBlogRequest] = useState<{ blogs: any[]; fetched: boolean }>({
        blogs: [],
        fetched: false,
    });


    useEffect(() => {
        const getBlogs = async (userToken: string) => {
            const response = await handleAsyncError(async () => get_user_blog_headers(userToken));
            if (!response) {
                return;
            }
            const { blogs } = response;
            setBlogRequest({ blogs, fetched: true });
        };
        getBlogs(token);
    }, [token]);

    return (
        <>
            {blogRequest.fetched ? (
                <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-8'>
                    {blogRequest.blogs.length > 0 ? (
                        blogRequest.blogs.map((blog: { title: string; image: string; id: number }) => (
                            <Link
                                key={blog.id}
                                className='flex items-center flex-wrap flex-col space-y-1 mb-4 justify-center p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:scale-1.0'
                                href={`/my-blogs/${createSlug(blog.title, blog.id.toString())}`}
                            >
                                <div className='w-full flex flex-col'>
                                    <p className='text-neutral-900 dark:text-neutral-100 tracking-tight'>{blog.title}</p>
                                    <Suspense fallback={<p className='h-6'>Loading</p>}>
                                        {blog.image && <RenderImage src={blog.image} alt={blog.title} />}
                                    </Suspense>
                                </div>
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
            ) : (
                <div>Fetching</div>
            )}
        </>
    );
}

function RenderImage({ src, alt }: { src: string; alt: string }) {
    return (
        <div className='flex w-full h-full'>
            <Image width={400} height={400} src={`http://127.0.0.1:6699/checkup_api/blog/images/${src}`} alt={alt} priority={true} />
        </div>
    );
}

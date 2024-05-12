"use client"
import { Suspense } from 'react';
import Link from 'next/link';
import { get_user_blog_headers } from '@/app/lib/db/blogs_action';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function BlogsList({ token }: { token: string }) {

    const [blogs, setBlogs] = useState({ blogs: [], fetched: false })

    useEffect(() => {
        const get_blogs = async (user_token: string) => {

            const blogs = await get_user_blog_headers(user_token)
            setBlogs({ blogs: blogs, fetched: true })
        }
        get_blogs(token)

    }, [])


    return (
        <>
            {blogs.fetched ? (
                <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-8'>
                    {blogs.blogs.length !== 0 ? (
                        blogs.blogs.map((blog: { title: string, image: string, id: number }) => (
                            <Link
                                key={blog.id}
                                className="flex items-center flex-wrap flex-col space-y-1 mb-4 justify-center p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:scale-1.0"
                                href={`/blog/${blog.id}`}
                            >
                                <div className="w-full flex flex-col">
                                    <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                                        {blog.title}
                                    </p>
                                    <Suspense fallback={<p className="h-6" >Loading</p>}>
                                        {blog.image && <RenderImage src={blog.image} alt={blog.title} />}
                                    </Suspense>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div>
                            No blogs yet available!{' '}
                            <Link href={"/my-blogs/create"} className='text-blue-800'>
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


function RenderImage({ src, alt }: { src: string, alt: string }) {

    return (
        <div className='flex w-full h-full'>
            <Image width={400} height={400} src={"http://127.0.0.1:6699/checkup_api/blog/images/" + src} alt={alt} priority={true} />
        </div>
    );
}

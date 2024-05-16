"use client"
import Image from 'next/image'
import BackButton from '@/app/ui/ui_utils/backButton'
import DeleteBlog from '@/app/ui/blog/delete_blog'
import Link from 'next/link'
import { Blog } from '@/app/lib/db/models/definitions'

export default function BlogDisplayer({ blog, slug, token }: { blog: Blog | null, slug: string, token: string }) {

    return (
        <>
            {blog && blog.id ?
                <section>
                    <div className='flex justify-center'>
                        <div className='flex-col align-center'>
                            <h1>{blog.title}</h1>
                            {blog.image && <Image width={400} height={400} src={"http://127.0.0.1:6699/checkup_api/blog/images/" + blog.image} alt={blog.title} priority={true} />}
                            {blog.content && <div dangerouslySetInnerHTML={{ __html: blog.content }} />}
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <BackButton />
                        <Link href={`/my-blogs/${slug}/edit`}>Edit</Link>
                        <DeleteBlog token={token} blog_id={blog.id} />
                    </div>
                </section>
                : <div>Blog not found</div>
            }
        </>
    );
}
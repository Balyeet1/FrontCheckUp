"use client"
import Tiptap from "@/app/components/tiptap/Tiptap";
import BackButton from '@/app/components/ui_utils/backButton'
import DeleteBlog from '@/app/components/blog/delete_blog'
import Link from 'next/link'
import { Blog } from '@/app/lib/db/models/definitions'

export default function BlogDisplayer({ blog, slug, token }: { blog: Blog | null, slug: string, token: string }) {

    return (
        <>
            {blog && blog.id ?
                <section>
                    <div className='max-w-4xl m-auto'>
                        {blog.content && <Tiptap content={blog.content} className="focus:outline-none" isReadonly={true} />}
                        <div className='flex mt-4'>
                            <BackButton className="mr-2" />
                            <Link className="mr-2" href={`/my-blogs/${slug}/edit`}>Edit</Link>
                            <DeleteBlog className="mr-2" token={token} blog_id={blog.id} />
                        </div>
                    </div>
                </section>
                : <div>Blog not found</div>
            }
        </>
    );
}
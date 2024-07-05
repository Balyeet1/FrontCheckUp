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
                    <div className='flex justify-center'>
                        <div className='flex-col align-center'>
                            {blog.content && <Tiptap content={blog.content} className="focus:outline-none" isReadonly={true} />}
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
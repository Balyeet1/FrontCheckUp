"use client"
import Tiptap from "@/app/components/tiptap/Tiptap";
import DeleteBlog from '@/app/components/blog/delete_blog'
import { Blog } from '@/app/lib/db/models/definitions'
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

export default function BlogDisplayer({ blog, slug, token }: { blog: Blog | null, slug: string, token: string }) {
    const router = useRouter()

    return (
        <>
            {blog && blog.id ?
                <section>
                    <div className='max-w-2xl m-auto p-1'>
                        {blog.content && <Tiptap content={blog.content} className="focus:outline-none" isReadonly={true} />}
                        <div className='flex mt-8'>
                            <Button className="mr-4 bg-sky-300 hover:bg-sky-400" onClick={() => router.push(`/my-blogs`)}>Back</Button>
                            <Button className="mr-4 bg-success-400 houver:bg-success-200" onClick={() => router.push(`/my-blogs/${slug}/edit`)}>Edit</Button>
                            <DeleteBlog className="mr-4" token={token} blog_id={blog.id} />
                        </div>
                    </div>
                </section>
                : <div>Blog not found</div>
            }
        </>
    );
}
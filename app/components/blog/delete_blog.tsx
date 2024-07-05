"use client"
import React from 'react';
import { delete_user_blog } from '@/app/lib/db/BackServer_api/blogs_api_action';
import { useRouter } from 'next/navigation';

const DeleteBlog = ({ token, blog_id, className }: { token: string, blog_id: number, className?: string }) => {

    const router = useRouter();

    const handleDelete = () => {
        delete_user_blog(token, blog_id).then((response) => {
            if (response) {
                router.push('/my-blogs');
            }
        });
    }
    return (
        <button className={className} onClick={handleDelete}>Delete Blog</button>
    );
};

export default DeleteBlog;
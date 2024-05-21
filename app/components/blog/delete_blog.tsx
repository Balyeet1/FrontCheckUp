"use client"
import React from 'react';
import { delete_user_blog } from '@/app/lib/db/BackServer_api/blogs_api_action';
import { useRouter } from 'next/navigation';

const DeleteBlog = ({ token, blog_id }: { token: string, blog_id: number }) => {

    const router = useRouter();

    const handleDelete = () => {
        delete_user_blog(token, blog_id).then((response) => {
            if (response) {
                router.push('/my-blogs');
            }
        });
    }
    return (
        <button onClick={handleDelete}>Delete Blog</button>
    );
};

export default DeleteBlog;
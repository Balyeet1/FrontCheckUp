"use client"
import React, { useState } from 'react';
import { delete_user_blog } from '@/app/lib/db/BackServer_api/blogs_api_action';
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";

const DeleteBlog = ({ token, blog_id, className }: { token: string, blog_id: number, className?: string }) => {

    const router = useRouter();
    const [isLoading, setLoading] = useState<boolean>(false)

    const handleDelete = () => {
        setLoading(true)
        delete_user_blog(token, blog_id).then((response) => {
            if (response) {
                router.push('/my-blogs');
            }
        });
    }
    return (
        <Button
            color="danger"
            variant="ghost"
            className={className}
            onClick={handleDelete}
            isLoading={isLoading}
            spinner={
                <svg
                    className="animate-spin h-5 w-5 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                    />
                </svg>
            }
        >
            {`Delet${isLoading ? "ing" : "e"} Blog`}
        </Button>
    );
};

export default DeleteBlog;
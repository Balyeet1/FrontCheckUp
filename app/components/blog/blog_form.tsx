'use client'
import React, { useState } from 'react';
import { Blog } from '@/app/lib/db/models/definitions'

const onSubmit = (blog: Blog) => {
    console.log(blog);
};

const BlogForm = () => {
    const [title, setTitle] = useState<string>('');
    const [image, setMainImage] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const blog: Blog = { title, image, content };
        onSubmit(blog);
        setTitle('');
        setMainImage('');
        setContent('');
    }


    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <br />
                <label className='m-5'>
                    <h4 className='text-gray-700'>
                        Title:
                    </h4>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-white-400 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </label>
                <br />
                <label className='m-5'>
                    <h4 className='text-gray-700'>
                        Image:
                    </h4>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setMainImage(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-white-400 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </label>
                <br />
                <label className='m-5'>
                    <h4 className='text-gray-700'>
                        Content:
                    </h4>
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 white-400 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </label>
                <br />
                <div className="flex items-center justify-center pt-5">
                    <button type="submit" className='text-gray-700'>Create Blog</button>
                </div>
            </form>
        </div>
    );
};


export default BlogForm;
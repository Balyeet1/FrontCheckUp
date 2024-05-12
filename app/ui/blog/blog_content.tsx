'use client'
import { create_user_blog } from '@/app/lib/db/blogs_action';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogContent = ({ token }: { token: string }) => {
    const router = useRouter()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [media, setMedia] = useState<File | null>(null);
    const [mediaUrl, setMediaUrl] = useState<string | null>(null);
    const [previewMode, setPreviewMode] = useState(false);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setMedia(file);
        if (file) {
            setMediaUrl(URL.createObjectURL(file));
        }
    };

    const togglePreviewMode = () => {
        setPreviewMode(!previewMode);
    };

    const renderMediaPreview = () => {
        if (!mediaUrl) return null;
        if (media && media.type.startsWith('image/')) {
            return <img src={mediaUrl} alt="Preview" />;
        } else if (media && media.type.startsWith('video/')) {
            return <video src={mediaUrl} controls />;
        } else if (media && media.type.startsWith('audio/')) {
            return <audio src={mediaUrl} controls />;
        }
        return null;
    };

    const createBlog = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (media) {
            formData.append('image', media, media.name);
        }

        create_user_blog(token, formData).then((response) => {
            console.log(response)
            if (response) {
                router.push('/my-blogs');
            }
        });
    };

    return (
        <div className='flex px-8 pt-6 pb-8 mb-4 min-h-screen'>
            <div className='flex-col w-full mr-2 p-4'>
                {!previewMode &&
                    <>
                        <div className='text-2xl font-bold pb-3'>Create Blog</div>
                        <div className='flex items-end mt-5 mb-5 justify-between'>
                            <label>
                                <h4 className='text-gray-700'>
                                    Title:
                                </h4>
                                <input type="text" value={title} onChange={handleTitleChange} placeholder="Enter title" />
                            </label>
                            <input type="file" onChange={handleFileUpload} />
                        </div>
                    </>
                }
                {previewMode ?
                    <div className='flex justify-center'>
                        <div className='flex-col align-center'>
                            <h1>{title}</h1>
                            {renderMediaPreview()}
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    </div>
                    : <ReactQuill value={content} onChange={handleContentChange} theme='snow' />}
                <div className='pt-5'>
                    <button onClick={togglePreviewMode}>{previewMode ? 'Edit' : 'Preview'}</button>
                    {previewMode && <button onClick={createBlog} className='ml-4'>Create Blog</button>}
                </div>
            </div>
        </div>
    );
};

export default BlogContent;

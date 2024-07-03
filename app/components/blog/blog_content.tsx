'use client'
import { update_user_blog, create_user_blog } from '@/app/lib/db/BackServer_api/blogs_api_action';
import { Blog } from '@/app/lib/db/models/definitions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Tiptap from "@/app/components/tiptap/Tiptap";

const BlogContent = ({ token, blog }: { token: string, blog?: Blog }) => {
    const router = useRouter()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [media, setMedia] = useState<File | null>(null);
    const [mediaUrl, setMediaUrl] = useState<string | null>(null);
    const [previewMode, setPreviewMode] = useState(false);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
            if (blog.image == null) return;
            fetch(`http://127.0.0.1:6699/checkup_api/blog/download/${blog.image}`).then(response => {
                response.blob().then(blob => {
                    setMedia(new File([blob], blog.image, { type: blob.type }));
                    setMediaUrl(URL.createObjectURL(blob));
                });
            });
        }
    }, [blog]);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
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

    const createOrUpdateBlog = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (media) {
            formData.append('image', media, media.name);
        }

        if (blog && blog.id) {
            update_user_blog(token, blog.id, formData).then((response) => {
                if (response) {
                    router.push('/my-blogs');
                }
            });
        } else {
            create_user_blog(token, formData).then((response) => {
                console.log(response)
                if (response) {
                    router.push('/my-blogs');
                }
            });
        }
    };

    return (
        <div className='flex px-8 pt-6 pb-8 mb-4 min-h-screen'>
            <div className='flex-col w-full mr-2 p-4'>
                {!previewMode &&
                    <>
                        <div className='text-2xl font-bold pb-3'>{blog ? 'Edit Blog' : 'Create Blog'}</div>
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
                {previewMode &&
                    <>
                        <div className='flex justify-center'>
                            <div className='flex-col align-center'>
                                <h1>{title}</h1>
                                {renderMediaPreview()}
                                <div dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
                    </>
                }
                {previewMode && <Tiptap content={content} className="focus:outline-none" onChange={setContent} isReadonly={true} />}
                {!previewMode && <Tiptap content={content} className="focus:outline-none" onChange={setContent} isReadonly={false} />}
                <div className='pt-5'>
                    <button onClick={togglePreviewMode}>{previewMode ? 'Edit' : 'Preview'}</button>
                    {previewMode && <button onClick={createOrUpdateBlog} className='ml-4'>{blog ? 'Update Blog' : 'Create Blog'}</button>}
                </div>
            </div>
        </div>
    );
};

export default BlogContent;

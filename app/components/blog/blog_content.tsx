'use client'
import { update_user_blog, create_user_blog } from '@/app/lib/db/BackServer_api/blogs_api_action';
import { Blog } from '@/app/lib/db/models/definitions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import Tiptap from "@/app/components/tiptap/Tiptap";

const BlogContent = ({ token, blog }: { token: string, blog?: Blog }) => {
    const router = useRouter()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [media, setMedia] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
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

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setMedia(file);
        if (file) {
            setMediaUrl(URL.createObjectURL(file));
        }
    };

    const togglePreviewMode = () => {
        if (!previewMode) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            const firstElement = doc.body.firstChild;

            const getDirectTextContent = (element: any) => {
                let text = '';
                for (const child of element.childNodes) {
                    if (child.nodeType === Node.TEXT_NODE) {
                        text += child.textContent;
                    } else {
                        text += getDirectTextContent(child); // Recurse for nested elements
                    }
                }
                return text;
            }

            setTitle(firstElement ? getDirectTextContent(firstElement) : "");
        }

        setPreviewMode(!previewMode);
    };

    const renderMediaPreview = () => {
        if (!mediaUrl) return null;
        if (media && media.type.startsWith('image/')) {
            return <img src={mediaUrl} alt="Preview" className='w-auto h-auto' />;
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

                            <label htmlFor="fileInput" className='bg-gray-800 p-2.5 border border-gray-300 cursor-pointer rounded-lg'>
                                {!media ? 'Choose File' : media?.name}
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </>
                }
                {previewMode &&
                    <>
                        <div className='flex justify-center'>
                            <div className='flex-col align-center'>
                                <h1>{title}</h1>
                                {renderMediaPreview()}
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

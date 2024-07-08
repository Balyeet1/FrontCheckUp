'use client'
import { update_user_blog, create_user_blog } from '@/app/lib/db/BackServer_api/blogs_api_action';
import { Blog } from '@/app/lib/db/models/definitions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import Tiptap from "@/app/components/tiptap/Tiptap";
import { createSlug } from '@/app/lib/utils/utils';
import { Accordion, AccordionItem } from "@nextui-org/react";

const BlogContent = ({ token, blog }: { token: string, blog?: Blog }) => {
    const router = useRouter()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isFetched, setIsFetched] = useState(false)
    const [media, setMedia] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [mediaUrl, setMediaUrl] = useState<string | null>(null);
    const [previewMode, setPreviewMode] = useState(false);

    useEffect(() => {
        console.log(blog)
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
            setIsFetched(true)
            if (blog.image == null) return;
            fetch(`http://127.0.0.1:6699/checkup_api/blog/download/${blog.image}`).then(response => {
                response.blob().then(blob => {
                    setMedia(new File([blob], blog.image, { type: blob.type }));
                    setMediaUrl(URL.createObjectURL(blob));

                });
            });
        } else setIsFetched(true)
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
            return <img src={mediaUrl} alt="Preview" className='w-auto h-auto rounded-md object-cover' />;
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
                    const blog_id = blog.id
                    router.push('/my-blogs/' + createSlug(blog.title, blog_id?.toString()));
                }
            });
        } else {
            create_user_blog(token, formData).then((data: any) => {
                const { response, blog } = data;

                if (response) {
                    router.push('/my-blogs/' + createSlug(blog.title, blog.id.toString()));
                }
            });
        }
    };

    return (
        <div className='pt-6 max-w-4xl m-auto'>
            <div className='flex-col w-full mr-2 p-4'>
                {!previewMode &&
                    <>
                        <div className='text-2xl font-bold pb-3'>{blog ? 'Edit Blog' : 'Create Blog'}</div>
                        <div className='flex items-end mt-5 mb-5 justify-between'>

                            <label htmlFor="fileInput" className='bg-gray-800 p-2.5 border border-gray-300 cursor-pointer rounded-lg'>
                                {!media ? 'Thumbnail' : media?.name}
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
                        <Accordion className='border border-gray-200 rounded-lg'>
                            <AccordionItem key="Thumbnail" aria-label="Thumbnail" title="Thumbnail">
                                <div className='flex justify-center'>
                                    <div
                                        className='flex flex-wrap flex-col items-center space-y-1 mb-4 max-w-100 justify-center p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:scale-1.0'
                                    >
                                        <h1 className='text-neutral-900 dark:text-neutral-100 tracking-tight'>{title}</h1>
                                        <div>
                                            {renderMediaPreview()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>
                        </Accordion>
                        <div className='pt-4'>
                            <Tiptap content={content} className="focus:outline-none" onChange={setContent} isReadonly={true} />
                        </div>
                    </>
                }
                {isFetched &&
                    <>
                        {!previewMode && <Tiptap content={content} className="focus:outline-none" onChange={setContent} isReadonly={false} />}
                    </>
                }
                <div className='pt-5'>
                    <button onClick={togglePreviewMode}>{previewMode ? 'Edit' : 'Preview'}</button>
                    {previewMode && <button onClick={createOrUpdateBlog} className='ml-4'>{blog ? 'Update Blog' : 'Create Blog'}</button>}
                </div>
            </div>
        </div>
    );
};

export default BlogContent;

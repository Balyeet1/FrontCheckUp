'use client'
import { update_user_blog, create_user_blog, get_blog_image } from '@/app/lib/db/BackServer_api/blogs_api_action';
import { Blog } from '@/app/lib/db/models/definitions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Tiptap from "@/app/components/tiptap/Tiptap";
import { createSlug } from '@/app/lib/utils/utils';
import { Accordion, AccordionItem, image } from "@nextui-org/react";
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import ImageUploader from '@/app/components/images/ImageUploader';
import { Tabs, Tab } from "@nextui-org/react";
import { atob } from 'js-base64';


//Remove this later ONLY FOR TEST ----------------------------------------------------------------------------------------------
import { get_user_images_list } from '@/app/lib/db/BackServer_api/images_api_actions';
//Remove this later ONLY FOR TEST ----------------------------------------------------------------------------------------------

const BlogContent = ({ imageUrl, token, blog }: { imageUrl: string, token: string, blog?: Blog }) => {
    const router = useRouter()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isFetched, setIsFetched] = useState(false)
    const [media, setMedia] = useState<File | null>(null);
    const [mediaUrl, setMediaUrl] = useState<string | null>(null);
    const [previewMode, setPreviewMode] = useState(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
            if (blog.image == null) {
                setIsFetched(true)
                return;
            }
            //Remove this later ONLY FOR TEST ----------------------------------------------------------------------------------------------
            get_user_images_list(token)
            //Remove this later ONLY FOR TEST ----------------------------------------------------------------------------------------------
            get_blog_image(token, blog.image).then((response) => {
                function base64ToFile(base64String: string, filename: string) {
                    const byteCharacters = atob(base64String);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length;
                        i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], {
                        type: "image/"
                    });

                    return new File([blob], filename, { type: blob.type });
                }

                const file = base64ToFile(response, blog.image)
                setMedia(file);
                setMediaUrl(URL.createObjectURL(file));
                setIsFetched(true)
            })

        } else setIsFetched(true)
    }, [blog]);

    const handleImageUpload = (image: File | null) => {
        if (!image) {
            setMedia(null)
            setMediaUrl(null)
            return
        }

        setMedia(image);
        setMediaUrl(URL.createObjectURL(image));
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
            return <Image src={mediaUrl} alt="Preview" width={800} height={500} className='w-auto h-60 rounded-md object-cover' />;
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
            setLoading(true)
            update_user_blog(token, blog.id, formData).then((data: any) => {
                const { response, blog } = data;
                if (response) {
                    router.push('/my-blogs/' + createSlug(blog.title, blog.id?.toString()));
                }
            });
        } else {
            setLoading(true)
            create_user_blog(token, formData).then((data: any) => {
                const { response, blog } = data;

                if (response) {
                    router.push('/my-blogs/' + createSlug(blog.title, blog.id.toString()));
                }
            });
        }
    };

    return (
        <div className='pt-6 max-w-2xl m-auto'>
            <div className='flex-col w-full p-1'>
                {!previewMode &&
                    <>
                        <div className='text-2xl font-bold pb-3'>{blog ? 'Edit Blog' : 'Create Blog'}</div>
                        <Tabs aria-label="Options">
                            <Tab key="thumbnail" title="Thumbnail">
                                <ImageUploader image={media} setImage={handleImageUpload} />
                            </Tab>
                            <Tab key="main content" title="Main Content">
                                {isFetched &&
                                    <Tiptap content={content} className="focus:outline-none" onChange={setContent} isReadonly={false} />
                                }
                            </Tab>
                        </Tabs>
                    </>
                }
                {previewMode &&
                    <>
                        <Accordion className='border preview_thumbnail'>
                            <AccordionItem key="Thumbnail" aria-label="Thumbnail" title="Thumbnail">
                                <div className='flex justify-center'>
                                    <div
                                        className='flex flex-wrap flex-col items-center space-y-1 mb-4 max-w-80 justify-center p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:scale-1.0'
                                    >
                                        <strong>
                                            <h1 className='text-neutral-900 dark:text-neutral-100 tracking-tight'>{title}</h1>
                                        </strong>
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
                <div className='pt-5'>
                    <Button
                        className="bg-sky-300 hover:bg-sky-400 mr-3" onClick={togglePreviewMode}>{previewMode ? 'Edit' : 'Preview'}</Button>
                    {previewMode &&
                        <Button
                            className='bg-success-400 houver:bg-success-200'
                            onClick={createOrUpdateBlog}
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
                            {blog ? `Updat${isLoading ? "ing" : "e"} Blog` : `Creat${isLoading ? "ing" : "e"} Blog`}
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
};

export default BlogContent;

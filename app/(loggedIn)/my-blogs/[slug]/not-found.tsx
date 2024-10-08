import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog not found',
}

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl">Blog Not Found</h1>
            <div>
                <Link href="/my-blogs"><u>Back to my blogs.</u></Link>
            </div>
        </div>
    );
};

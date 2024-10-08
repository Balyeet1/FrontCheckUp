import BackButton from '@/app/components/ui_utils/backButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Page 404',
}

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl">Page not found</h1>
            <div>
                <BackButton underline />
            </div>
        </div>
    );
};

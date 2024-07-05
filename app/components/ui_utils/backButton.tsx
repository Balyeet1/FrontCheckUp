"use client"

import { useRouter } from 'next/navigation';

const BackButton = ({ className }: { className?: string }) => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <button className={className} onClick={handleGoBack}>
            Back
        </button>
    );
};

export default BackButton;
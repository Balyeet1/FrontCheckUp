"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const BackButton: React.FC = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <button onClick={handleGoBack}>
            Back
        </button>
    );
};

export default BackButton;
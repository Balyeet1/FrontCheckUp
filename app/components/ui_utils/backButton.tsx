"use client"

import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";


const BackButton = ({ className, nextui }: { className?: string, nextui?: boolean }) => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <>
            {!nextui ?
                < button className={className} onClick={handleGoBack} >
                    Back
                </button >
                :
                <Button className={className + " bg-sky-300 hover:bg-sky-400"} onClick={handleGoBack}>
                    Back
                </Button>
            }
        </>
    );
};

export default BackButton;
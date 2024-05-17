"use client"
import React, { useEffect, useState } from 'react';
import { checkServerStatus } from '@/app/lib/db/BackServer_api/api';

const CheckServerStatus: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isServerDown, setIsServerDown] = useState(false);

    useEffect(() => {
        const checkServer = async () => {
            setIsServerDown(!(await checkServerStatus()));
        };

        checkServer();
        const intervalId = setInterval(checkServer, 5 * 60 * 1000); // Call every 5 minutes

        return () => clearInterval(intervalId);

    }, []);

    if (isServerDown) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>Server is currently down for maintenance</h1>
                <p>Please try again later.</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default CheckServerStatus;
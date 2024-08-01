"use client"
import { checkServerStatus } from '@/app/lib/db/BackServer_api/api';
import { useUser } from '@auth0/nextjs-auth0/client';
import LogoutUser from './Logout';
import { useEffect, useState } from 'react';


const CheckServerStatus: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isServerUp, setIsServerUp] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useUser();

    useEffect(() => {
        async function fetchData() {
            try {
                setIsServerUp(await checkServerStatus())
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])


    return (
        <>
            {!isLoading && !isServerUp ?
                <div className="flex flex-col justify-center items-center h-screen">
                    <h1>Server is currently down for maintenance</h1>
                    <p>Please try again later.</p>
                    <button onClick={() => window.location.reload()}>Refresh</button>
                    {user && <LogoutUser />}
                </div >
                :
                <>{children}</>
            }
        </>
    );
};

export default CheckServerStatus;
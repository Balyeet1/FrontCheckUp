"use client"

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useRef } from 'react';

export default function LogoutUser() {

    const { user } = useUser();
    const logoutLinkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (user && logoutLinkRef.current) {
            logoutLinkRef.current.click();
        }
    }, [user]);

    return (
        <>
            {user && <a href='/api/auth/logout' ref={logoutLinkRef} />}
        </>
    )
};


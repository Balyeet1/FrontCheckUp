"use client"

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';

export default function LogoutUser() {

    const { user } = useUser();

    useEffect(() => {
        if (user) {
            try {
                fetch('/api/auth/logout', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Logged out');
            } catch (error) {
                console.error('Failed to logout', error);
            }
        }
    }, [user]);

    return null;
}

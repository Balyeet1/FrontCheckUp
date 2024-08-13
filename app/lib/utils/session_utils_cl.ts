"use client"

import { useUser } from '@auth0/nextjs-auth0/client';

export function getUserToken() {

    const { user, error, isLoading } = useUser();

    if (!user || !user?.token) {
        throw new Error("Error fetching user token!");
    }

    return user.token
}


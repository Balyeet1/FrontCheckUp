"use client"

export default function logout(): Promise<Response> {
    try {
        return fetch('/api/auth/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        throw new Error('Failed to logout');
    }
}
"use client"
import { useState } from 'react';

export default function useApi(apiFunc: any) {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const request = async (...args: any) => {
        setLoading(true);
        try {
            const response = await apiFunc(...args);
            setData(response);
            setError(null);
        } catch (err: Error | any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, request };
};
"use client"

export default async function handleAsyncError(asyncFn: () => Promise<any>): Promise<any> {
    try {
        return await asyncFn();
    } catch (error) {
        console.error(error);
        return null;
    }
}
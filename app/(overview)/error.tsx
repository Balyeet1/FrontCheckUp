'use client'
import Link from 'next/link';

const ErrorPage = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Something went wrong</h1>
                <p>We apologize for the inconvenience.</p>
                <Link href="/">
                    Go back to the home page
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
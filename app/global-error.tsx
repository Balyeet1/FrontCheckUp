'use client'
import Link from "next/link"

export default function GlobalError({ reset }: { reset?: () => void }) {
    return (
        <html>
            <body>
                <div className="flex justify-center items-center h-screen">
                    <div className="text-center">
                        <h1>Something went wrong</h1>
                        <p>I apologize for the inconvenience.</p>
                        <Link href="/">
                            Go back to the home page
                        </Link>
                    </div>
                </div>
            </body>
        </html>
    )
}
"use client"

import Tiptap from "@/app/components/tiptap/Tiptap";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
    const [content, setContent] = useState("")
    const [readonly, setReadonly] = useState(false)

    const router = useRouter()

    const handlerSave = () => {
        console.log(content)
        router.push("/")
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between sm:p-16 p-4 mx-auto max-w-4xl">
            <div className="z-10 w-full max-w-7xl font-mono text-sm">
                {!readonly && <h1 className="text-4xl font-bold mb-8">Tiptap Editor</h1>}
                <button onClick={() => setReadonly(!readonly)}>Change Mode</button>
                <br />
                <br />

                {readonly && <Tiptap content={content} className="focus:outline-none" onChange={setContent} isReadonly={true} />}
                {!readonly && <Tiptap content={content} className="focus:outline-none" onChange={setContent} isReadonly={false} />}
            </div>
            <button onClick={handlerSave} className="mt-3">Save</button>
        </main>
    );
}
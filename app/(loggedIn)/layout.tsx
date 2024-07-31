"use client"
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { Skeleton } from "@nextui-org/react";

export default function LogedInLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user, error, isLoading } = useUser();
    const router = useRouter();

    return (
        <section className="mx-auto p-3 sm:px-6 xl:px-8">
            <div className="flex mr-4 pt-5 items-center justify-end">
                <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                        {isLoading ?
                            <div className="max-w-[200px] w-full flex items-center m-0 p-0">
                                <div className="mr-2">
                                    <Skeleton className="flex rounded-full w-12 h-12" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                                    <Skeleton className="h-3 w-5/5 rounded-lg" />
                                </div>
                            </div>
                            :
                            <User
                                as="button"
                                avatarProps={{
                                    isBordered: true,
                                    src: user?.picture ? user.picture : 'https://lh3.googleusercontent.com/-XKhiu1SzQw4/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfkmy5icvnaWkuUg79sYjPhdLcjiGYA/photo.jpg?sz=46',
                                }}
                                className="transition-transform"
                                description={user?.nickname}
                                name={user?.name}
                            />
                        }
                    </DropdownTrigger>
                    <DropdownMenu disabledKeys={["profile"]} aria-label="User Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2 opacity-100" aria-label="User Profile">
                            <p className="font-bold">Signed in as</p>
                            <p className="font-bold">{user?.nickname}</p>
                        </DropdownItem>
                        <DropdownItem key="blogs" aria-label="My-Blogs" onClick={() => router.push("/my-blogs")}>
                            My-Blogs
                        </DropdownItem>
                        <DropdownItem key="settings" aria-label="User Settings" onClick={() => router.push("/my-profile")}>
                            Settings
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger" href="/api/auth/logout" aria-label="Logout">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div>
                {children}
            </div>
        </section>
    );
}
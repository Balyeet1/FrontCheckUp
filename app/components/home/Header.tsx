import Link from "next/link"
import siteMetadata from '@/data/siteMetadata'
import SearchButton from "./SearchButton"
import MobileNav from "./MobileNav"
import { space_Grotesk } from "@/app/components/fonts"
import Image from "next/image"
import { getSession } from "@auth0/nextjs-auth0"

const headerNavLinks = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
    { href: '/about', title: 'About' },
]

const Header = async () => {

    const session = await getSession();
    const user = session?.user;

    return (
        <header className="flex items-center justify-between py-10">
            <div>
                <Link className="flex items-center" href={"/"} >
                    <Image src={siteMetadata.siteLogo}
                        width={50}
                        height={50}
                        priority={true}
                        className="w-full h-auto"
                        alt="CheckUp Logo"></Image>
                    <div className="hidden text-2xl font-semibold sm:block">
                        {siteMetadata.title}
                    </div>
                </Link>
            </div>
            <div className={`${space_Grotesk.className} flex items-center space-x-4 leading-5 sm:space-x-6`}>
                {headerNavLinks
                    .filter(link => link.title != 'Home')
                    .map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="hidden font-medium text-gray-100 sm:block"
                        >
                            {link.title}
                        </Link>
                    ))}
                {user && (<Link href='/my-profile/'>{user.name}</Link>)}
                {!user && (<Link
                    href="/api/auth/login/"
                    className="font-medium text-gray-100"
                >
                    Login
                </Link>)}
                < SearchButton />
                <MobileNav headerNavLinks={headerNavLinks} />
            </div>
        </header>
    )
}

export default Header

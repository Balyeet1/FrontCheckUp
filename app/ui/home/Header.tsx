import Link from "next/link"
import siteMetadata from '@/data/siteMetadata'
import SearchButton from "./SearchButton"
import MobileNav from "./MobileNav"
import { space_Grotesk } from "@/app/ui/fonts"
import Image from "next/image"

const headerNavLinks = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
    { href: '/about', title: 'About' },
    { href: '/login', title: 'Login' },

]

const Header = () => {
    return (
        <header className="flex items-center justify-between py-10">
            <div>
                <Link className="flex items-center" href={"/"} >
                    <Image src={siteMetadata.siteLogo}
                        width={75}
                        height={75}
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
                <SearchButton />
                <MobileNav headerNavLinks={headerNavLinks} />
            </div>
        </header>
    )
}

export default Header
